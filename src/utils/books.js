import axios from "axios";

// Utility function to create an updated searchParams object which
// can be passed to setSearchParams.

export const updateSearchParams = (searchParams, key, value) =>
	Object.assign(
		{},
		[...searchParams.entries()].reduce(
			(o, [key, value]) => ({ ...o, [key]: value }),
			{}
		),
		{ [key]: value }
	);

const api = axios.create({
	baseURL: "https://www.googleapis.com/books/v1/volumes",
});

import MistralClient from "./mistralai.js";
import { ActivityIndicatorComponent } from "react-native";
const apiKey = process.env.MISTRAL_KEY;

const client = new MistralClient(apiKey);

const searchMistral = async (title) => {
	const query = "Find books similar to ${title}";

	response = await client
		.chat({
			model: "open-mistral-7b",
			messages: [
				{
					role: "system",
					content:
						"Always provide the result in JSON format with title, author and description",
				},
				{
					role: "system",
					content:
						"Always provide the results as an array of JSON objects",
				},
				{
					role: "system",
					content: "Each object should be a single book",
				},
				{
					role: "system",
					content:
						"The results should not contain the book given in the query",
				},
				{
					role: "system",
					content: "Always try and provide at least 8 answers",
				},
				{
					role: "system",
					content: "Try and rank the books in order of popularity",
				},
				{
					role: "system",
					content: "Each result must have a different title",
				},
				{
					role: "system",
					content:
						"Don't list books in the same series as any book mentioned",
				},
				{
					role: "system",
					content: "Each result must be an existing book",
				},
				{
					role: "system",
					content:
						"Avoid books with non-latin characters in their title",
				},
				{
					role: "user",
					content: query,
				},
			],
		})
		.then((response) => response.choices[0].message.content);
};

function extractData(book) {
	const info = book.volumeInfo;

	return {
		id: book.id,
		title: info.title,
		author: info.authors[0],
		description: info.description,
		thumbnail: info.imageLinks.thumbnail,
	};
}

const filterBooks = (books) =>
	books.filter(
		(book) => book.volumeInfo.description && book.volumeInfo.imageLinks
	);

const rankByRating = (books) => {
	const rated = books.filter((book) => book.volumeInfo.ratingsCount);
	rated.sort((a, b) => b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount);
	return rated;
};

export function fetchBook(title, author) {
	const cleanedTitle = title.replaceAll(" ", "+");
	const cleanedAuthor = author.replaceAll(" ", "+");

	const query = `?maxResults=1&q=intitle:${cleanedTitle}+inauthor:${cleanedAuthor}`;

	return api
		.get(query)
		.then(({ data: { items: books } }) => extractData(books[0]));
}

export function fetchBooks(title, author) {
	const cleanedTitle = title.replaceAll(" ", "+");
	const cleanedAuthor = author.replaceAll(" ", "+");

	const query = `?q=intitle:${cleanedTitle}+inauthor:${cleanedAuthor}`;

	return api.get(query).then(({ data: { items: books } }) => books);
}

export function fetchFromGoogle(mistralResults) {
	// Ensure that the mistral results are all for different books.

	const titles = {};

	for (const result of mistralResults) {
		const title = result.title;

		if (Object.hasOwn(titles, title)) {
		} else {
			titles[title] = result;
		}
	}

	const makeRequest = (request) =>
		request().catch((error) => {
			return Promise.reject(error);
		});

	const requests = Object.values(titles).map((result) =>
		makeRequest(() => fetchBooks(result.title, result.author))
	);

	return Promise.all(requests).then((results) => {
		const selected = [];

		for (const books of results) {
			if (books) {
				const possibles = filterBooks(books);
				if (possibles.length > 0) {
					const rated = rankByRating(possibles);
					if (rated.length > 0) {
						selected.push(rated[0]);
					} else {
						selected.push(possibles[0]);
					}
				}
			}
		}

		// Ensure that there are no duplicates.

		const filtered = {};
		for (const book of selected) {
			if (Object.hasOwn(book.id)) {
			} else {
				filtered[book.id] = book;
			}
		}

		for (const book of Object.values(filtered)) {
		}

		return Object.values(filtered).map((book) => extractData(book));
	});
}

function fetchBookById(volumeId) {
	const query = volumeId;

	return api.get(query).then(({ data: book }) => extractData(book));
}

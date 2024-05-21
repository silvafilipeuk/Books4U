import axios from 'axios';

// Utility function to create an updated searchParams object which
// can be passed to setSearchParams.

export const updateSearchParams = (searchParams, key, value) =>
  Object.assign({},
    [...searchParams.entries()].reduce(
      (o, [key, value]) => ({ ...o, [key]: value }),
      {}
    ),
    { [key]: value });

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes'
});

import MistralClient from "./mistralai.js";
import { ActivityIndicatorComponent } from 'react-native';
const apiKey = "RO0bojds8YfNol2aq6C48HQ524FOeCRW";

const client = new MistralClient(apiKey);

export const searchMistral = async query => {
  const [response, setResponse] = useState('');
  const [responseString, setResponseString] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  response = await client.chat({
    model: "open-mistral-7b",
    messages: [
      {
        role: "system",
        content:
          "Always provide the result in JSON format with title, author, ISBN and description",
      },
      {
        role: "system",
        content:
          "Always provide the results as an array of JSON objects",
      },
      {
        role: "system",
        content:
          "Only provide answers related to books, otherwise answer 'Not found'",
      },
      {
        role: "system",
        content:
          "Each object should be a single book",
      },
      {
        role: "system",
        content:
          "Always try and provide 5 answers",
      },
      {
        role: "system",
        content:
          "Try and rank the books in order of popularity",
      },
      {
        role: "system",
        content:
          "Each result must have a different title",
      },
      {
        role: "user",
        content: query,
      },
    ],
  })
  .then(response => {
    const text = response.choices[0].message.content;
/*
    for (const book of parseResponse(text)) {
      console.log(book);
    }
*/
    return text;
  })
}

function extractData(book) {
  const info = book.volumeInfo;
  
  return {
    id: book.id,
    title: info.title,
    author: info.authors[0],
    description: info.description,
    thumbnail: info.imageLinks.thumbnail
  }
}

const filterBooks = books => 
  books.filter(book =>
    book.volumeInfo.description && book.volumeInfo.imageLinks);

export function fetchBook(title, author) {
  const cleanedTitle = title.replaceAll(' ', '+');
  const cleanedAuthor = author.replaceAll(' ', '+');

  const query =
    `?maxResults=1&q=intitle:${cleanedTitle}+inauthor:${cleanedAuthor}`;

  return api
    .get(query)
    .then(({ data: { items: books }}) => extractData(books[0]));
}

export function fetchBooks(title, author) {
  const cleanedTitle = title.replaceAll(' ', '+');
  const cleanedAuthor = author.replaceAll(' ', '+');
  
  const query =
    `?q=intitle:${cleanedTitle}+inauthor:${cleanedAuthor}`;

  return api
    .get(query)
    .then(({ data: { items: books }}) =>
      filterBooks(books).map(book => extractData(book)));
}
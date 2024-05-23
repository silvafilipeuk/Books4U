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
  response = await client.chat({
    model: "open-mistral-7b",
    messages: [
      {
        role: "system",
        content:
          "Always provide the result in JSON format with title and author",
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
          "Always try and provide at least 8 answers",
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
        role: "system",
        content:
          "Don't list books in the same series as any book mentioned",
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

const mistralResults = [
  {
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "description": "A Romantic novel that tells the story of Mr. and Miss Bennet during the British Regency era.",
  },
  {
    "author": "Jane Austen",
    "title": "Emma",
    "description": "A Romantic novel that follows the life of Emma Woodhouse, a young woman with a strong sense of self-worth who tries to matchmake for her acquaintances.",
  },
  {
    "author": "Jane Austen",
    "description": "A novel that explores the differing responses of the Dashwood sisters, Elinor and Marianne, to the intricacies of provincial life and the British social calendar.",
    "title": "Sense and Sensibility"
  },
  {
    "author": "Jane Austen",
    "description": "A satirical epistolary novel that portrays the pitfalls of reading Gothic novels, and the dangers of judging people by first impressions.",
    "title": "Northanger Abbey"
  },
  {
    "author": "Jane Austen",
    "description": "A novel that tells the story of Anne Elliot, a woman who was persuaded to break off her engagement to Frederick Wentworth eight years ago due to his lack of social status.",
    "title": "Persuasion"
  },
  {
    "author": "Jane Austen",
    "description": "A novel that explores the themes of morality, education, and the nature of sustaining relationships.",
    "title": "Mansfield Park"
  },
  {
    "author": "Ann Radcliffe",
    "description": "A popular Gothic novel about the chaste orphan Emily St. Aubert, who is orphaned at a young age and left to the care of her uncle.",
    "title": "Mysteries of Udolpho"
  },
  {
    "author": "Matthew Lewis",
    "description": "A Gothic novel that tells the story of a monk who, after a life of sin, seeks redemption.",
    "title": "The Monk"
  }
];

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
    .then(({ data: { items: books }}) => books);

  //filterBooks(books).map(book => extractData(book)));
}

export function fetchFromGoogle(mistralResults) {
  const makeRequest = request =>
    request()
      .catch(error => {
        console.log('Error');
        return Promise.reject(error);
      });

  const requests = mistralResults.map(result =>
    makeRequest(() => fetchBooks(result.title, result.author)));

  return Promise.all(requests)
    .then(results => {
      const selected = [];

      for (const books of results) {
        if (books) {
          const possibles = filterBooks(books);
          if (possibles.length > 0) {
            selected.push(extractData(possibles[0]));
          }
        }
      }
      return selected;
    });
}
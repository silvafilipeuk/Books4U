# Books4U

A social mobile App that uses AI to recommend books based on an open ended query provided by the user.
I.e: "I just read the Percy Jackson series, can you recommend me something similar?"

The app then respond with a series of similar books, which with we fetch all the books details from the Google books API,
to present the user with a detailed book page, with books cover picture, title, author, description and reviews.

The app also have the social aspect of it, where users can create groups of similar interest and share books and reviews of these books.

The project is created with React Native and Expo to ensure compability with any device, Supabase that handles users authentication and the App database, Mistral AI API to produce the results and Google Books API to fecth the details of each book.

## Video demonstrating the App functionalities:

- To be done.

## Environment Variables

You will need a environment variable called .env.dev with the following content;

SUPABASE_KEY=YOUR_SUPABASE_API_KEY
MISTRAL_KEY=YOUR_MISTRAL_API_KEY

## State Variables

The state variables are all contained in the GlobalState object which is
created and managed in App.js. It is passed as a prop to all screens which are
expected to deconstruct it to get access to the individual variables that are
needed.

-   session - the logged in user, empty if not logged in

After login will be an object, with the following useful information for us:

```
{
  email: "user@email.com",
  full_name: "user full name",
  sub: "user uuid"
}
```

-   books - the array of book objects passed by the Search page to results

-   book - the individual selected book passed to Detail page

-   searchQuery - Will receive the query string from the search base, to be used by results.js to produce the results.

## Google Books

Two functions, `fetchBook` and `fetchBooks` are provided by the module
src/utils/books.js and they can be used to return a single book or an
array of books. Each book is represented as a Book object as detailed below.

```
fetchBook(title, author) -> Book
fetchBooks(title, author) -> [ Book ]
```

## Book Object

The Search screen will generate an array of Book objects which will be
used to update the 'books' state variable in GlobalState.

The Results screen will deconstruct books from GlobalState and use the
information to present a scrollable list of books. If a book cover is
clicked on then the 'book' state variable will be set to the corresponding
item in the books array using the setBook function from GlobalState.

The books and book state use objects of the following format.

```
{
  id: string, - For now this is the id from Google Books
  title: string,
  author: string,
  thumbnail: string, - URL which can act as Image source uri
  description: string
}
```

# Authors:

- [Filipe da Silva](https://github.com/silvafilipeuk)
- [Massimo Ortu](https://github.com/Maestro1985)
- [Nobel Limbu](https://github.com/Nlim97)
- [Sean Holdsworth](https://github.com/SeanHoldsworth)

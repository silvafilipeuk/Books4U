# Books 4 u

## Instructions for creating new empty JavaScript Project

npx create-expo-app \<project-name\> --template

(Select Blank)

cd \<project-name\>

npx expo install react-native-web react-dom @expo/metro-runtime

Always use npx expo install rather than 'npm install' to make sure modules
are compatible with expo version.

npx expo install @react-navigation/native @react-navigation/native-stack

npx expo install react-native-screens react-native-safe-context

npx expo install expo-constants react-native-vector-icons

npx expo start

## State Variables

The state variables are all contained in the GlobalState object which is
created and managed in App.js. It is passed as a prop to all screens which are
expected to deconstruct it to get access to the individual variables that are
needed.

* user - the logged in user (uuid?), empty if not logged in

* books - the array of book objects passed by the Search page to results

* book - the individual selected book passed to Detail page

(Please add any others here...)

## Navigation

Everything we need to do regarding navigation (moving between pages and
to the previous page) can be done with the standard React Navigation
library.

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

## Database

There needs to be some way of linking the book id used by Google Books and
the id used by the books table in the database. Probably the simplest way
will be to hold the Google id as another column in the books table.

To access reviews, functions will need to be provided in src/utils/database.js
which will convert the data into things like Review and Group objects for use
in the frontend code.

```
fetchReviewsByBook(google_id) -> [ Review ]
```
## Review Object

The Supabase Postgres database containing group and review information will
be used to update the 'reviews' state variable in GlobalState.

```
{
  id: number, - database key
  text: string
}
```

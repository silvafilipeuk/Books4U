# Presentation Notes

## Overview

The aim of this project is to produce a mobile app that provides book recommendations. It allows users to
enter a book and to find books similar to it. This is done using a backend AI for the actual recommendations
coupled with a more traditional API to provide details on the suggested books.

Additionally the app has a social aspect to it. A user can provide a review of a book and view reviews of
books that come up as recommendations. They can also create or join an existing group of users who have
similar interests to their own and see reviews by other group members.

## Technologies and Resources

### Expo and React Native

The app is intended to run on both iOS and Android mobiles. For this reason React Native was chosen as the
frontend framework. This allows a single code base to target both mobile platforms. To support development
Expo was adopted to provide uniform access to mobile simulators as well as the ability to run the app on
physical devices during the coding phase. Additionally Expo provides facilities to deploy the finished
app onto both the Apple App Store and the Google Play Store.

### Supabase

Supabase was chosen as the backend to support both user authentication and to provide the relational database
necessary to implement the social aspects of the app. Additionally its row level security model was used to
prevent the possibility of using authentication details to view or modify the details of other user accounts
in unintended ways.

The hosted database comprises seven tables intended to model the social aspects of the app. It comprises
four main tables representing users, groups, books and reviews. An additional three link tables are used to
implement how these tables relate to one another. For example how a user can belong to multiple groups and
how there can be multiple reviews associated with a book.

### Mistral

Mistral is the AI which provides the book recommendations. It is queried to provide a list of books that
have similarities to a suggested book. This goes beyond searching for books of a similar genre that can be
achieved using a more conventional database.

To achieve this the API of the AI is used to provide it with a set of prompts that constrain it to provide
appropriate results in a specific format. For example the AI will provide back results in JSON format for
easy parsing and further filtering and processing.

### Google Books API

Whilst Mistral can provide recommendations in the form of a list of books, it cannot provide in depth details
on those books. So to access things like images of book covers and descriptions the Google Books database is
queried through its public API. Since the AI provides multiple books, multiple queries of the Google books
are done concurrently, with each query typically providing multiple versions of the same book which can then
be ranked, filtered and merged together to provide the data used on the results page of the app.

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

The state variables are all contained in the Globals object which is created
and managed in App.js. It is passed as a prop to all screens which are
expected to deconstruct it to get access to the individual variables that
are needed.

* user - the logged in user (uuid?), empty if not logged in

* books - the array of book objects passed by the search page to results

* book - the individual selected book passed to detail page

* page - The name of the current screen, set by navigation library

* pageHistory - managed by navigation library to move to previous page

(Please add any others here...)

## Navigation

There will be navigation file at src/utils/navigation.js that will allow
movement from one screen to another and also the user to return to
the previous page.

moveTo(pageName, remember=false)

This will move to pageName and add the current page to history is the
remember variable is set to true.

moveBack()


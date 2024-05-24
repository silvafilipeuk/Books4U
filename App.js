import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import ForgotPassword from "./src/screens/ForgotPassword";
import Groups from "./src/screens/Groups";
import Group from "./src/screens/Group";
import Search from "./src/screens/Search";
import SignUp from "./src/screens/SignUp";
import CreateGroup from "./src/screens/CreateGroup";
import Results from "./src/screens/Results";
import Detail from "./src/screens/Detail";
import Member from "./src/screens/Member";

import { supabase, getSession } from "./src/utils/SupabaseClient";
import { Session } from "@supabase/supabase-js";

import { AppState } from "react-native";

import BookReview from "./src/screens/BookReview";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Stack = createNativeStackNavigator();

export default function App() {
	// Tells Supabase Auth to continuously refresh the session automatically
	// if the app is in the foreground. When this is added, you will continue
	// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
	// `SIGNED_OUT` event if the user's session is terminated. This should
	// only be registered once.
	AppState.addEventListener("change", (state) => {
		if (state === "active") {
			supabase.auth.startAutoRefresh();
		} else {
			supabase.auth.stopAutoRefresh();
		}
	});

	const [session, setSession] = useState(Session || null);
	const [searchQuery, setSearchQuery] = useState("");
	const [book, setBook] = useState(null);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		getSession().then((session) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event) => {
			getSession().then((session) => {
				setSession(session);
			});
		});
	}, []);

	const GlobalState = {
		session,
		setSession,
		book,
		setBook,
		books,
		setBooks,
		setSearchQuery,
		searchQuery,
	};

	// Navigation.

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" options={{ headerShown: false }}>
					{(props) => <Login {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen name="SignUp" options={{ headerShown: false }}>
					{(props) => <SignUp {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen name="Search" options={{ headerShown: false }}>
					{(props) => <Search {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen name="Home" options={{ headerShown: false }}>
					{(props) => <Home {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen
					name="ForgotPassword"
					options={{ headerShown: false }}
				>
					{(props) => (
						<ForgotPassword {...props} GlobalState={GlobalState} />
					)}
				</Stack.Screen>
				<Stack.Screen name="Groups" options={{ headerShown: false }}>
					{(props) => <Groups {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen name="Group">
					{(props) => <Group {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen
					name="CreateGroup"
					options={{ headerShown: false }}
				>
					{(props) => (
						<CreateGroup {...props} GlobalState={GlobalState} />
					)}
				</Stack.Screen>

				<Stack.Screen
					name="BookReview"
					options={{ headerShown: false }}
				>
					{(props) => (
						<BookReview {...props} GlobalState={GlobalState} />
					)}
				</Stack.Screen>

				<Stack.Screen name="Member">
					{(props) => <Member {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
				<Stack.Screen name="Results">
					{(props) => (
						<Results {...props} GlobalState={GlobalState} />
					)}
				</Stack.Screen>
				<Stack.Screen name="Detail">
					{(props) => <Detail {...props} GlobalState={GlobalState} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

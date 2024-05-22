import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import ForgotPassword from "./src/screens/ForgotPassword";
import Groups from "./src/screens/Groups";
import Group from "./src/screens/Group";
import SignUp from "./src/screens/SignUp";
import CreateGroup from "./src/screens/CreateGroup";
import { supabase } from "./src/utils/SupabaseClient";
import { Session } from "@supabase/supabase-js";
import Member from "./src/screens/Member";

const Stack = createNativeStackNavigator();

export default function App() {
	// Global state management.

	const [count, setCount] = useState(0);
	const [session, setSession] = useState(Session || null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	const GlobalState = {
		count,
		setCount,
		session,
		setSession,
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
				<Stack.Screen name="Member">
					{(props) => <Member {...props} GlobalState={GlobalState}/>}
				</Stack.Screen>
				
			</Stack.Navigator>
		</NavigationContainer>
	);
}

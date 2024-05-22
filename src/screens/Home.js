import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUsers, supabase } from "../utils/SupabaseClient";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ navigation, GlobalState }) {
	//const { session, count, setCount } = GlobalState;

	useEffect(() => {
		setCount((prevCount) => prevCount + 1);
	}, []);

	return (
		<View style={styles.screen}>
			<Header GlobalState={GlobalState} />
			<View style={styles.body}>
				<Text> Logged as: {session.user.email}</Text>
			</View>
			<Footer navigation={navigation} GlobalState={GlobalState} />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 8,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "#14141405",
	},
});

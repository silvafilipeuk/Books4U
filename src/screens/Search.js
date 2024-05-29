import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Search({ navigation, GlobalState }) {
	const [booksLike, setBooksLike] = useState("");
	// const [booksGenre, setBooksGenre] = useState("");
	const { setSearchQuery } = GlobalState;

	async function handleSubmit(e) {
		e.preventDefault();

		// Only one State will have value, so we can decide which
		// search we will do based on booksLike or booksGenre content.

		booksLike.length
			setSearchQuery(booksLike);
			// : setSearchQuery(booksGenre);

		setBooksLike("");
		navigation.navigate("Results");
	}

	return (
		<View style={styles.screen}>
			<Header GlobalState={GlobalState} />
			<ScrollView>
				<View style={styles.body}>
					<TextInput
						style={styles.input}
						placeholder="Search for books like..."
						value={booksLike}
						onChangeText={(value) => {
							setBooksLike(value);
							
						}}
						keyboardAppearance="text"
					/>
					{/* <Text style={styles.headerText}>Or:</Text>
					<TextInput
						style={styles.input}
						placeholder="Search for books by genre..."
						value={booksGenre}
						onChangeText={(value) => {
							setBooksGenre(value);
							setBooksLike("");
						}}
						keyboardAppearance="text"
					/> */}
					<TouchableOpacity
						style={styles.buttons}
						title="Search"
						onPress={handleSubmit}
					>
						<Text style={styles.text}>Search</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

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
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0,
	},
	headerText: {
		fontSize: 32,
		fontWeight: "bold",
	},
	subHeaderText: {
		fontSize: 18,
	},
	input: {
		height: 48,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 8,
		width: 300,
		borderRadius: 20,
		backgroundColor: "#d3d3d3",
		marginTop: 8,
	},
	buttons: {
		width: 300,
		backgroundColor: "#007AFF",
		borderRadius: 20,
		padding: 12,
		marginTop: 30,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},

	error: {
		color: "red",
		marginBottom: 10,
	},
	wrapper: {
		marginTop: 20,
	},
	bold: {
		fontWeight: "bold",
	},
	signup: {
		marginTop: 20,
		color: "black",
		textAlign: "center",
		fontWeight: "bold",
	},
});

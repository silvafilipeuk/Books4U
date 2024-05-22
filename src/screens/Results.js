import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ItemSeparatorComponent,
	FlatListComponent,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

import { fetchBook, fetchBooks } from "../utils/books";

export default function Results({ navigation, GlobalState }) {
	const { count, setCount } = GlobalState;
	const [book, setBook] = useState("");
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Will expect title and author to be passed in globals.
	const title = "Cold Comfort Farm";
	const author = "Stella Gibbons";

	useEffect(() => {
		setIsLoading(true);

		fetchBooks(title, author).then((books) => {
			setBooks([...books]);
			setBook(books[0]);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) return <Text>Loading...</Text>;

	return (
		<View style={styles.screen}>
			<Header GlobalState={GlobalState} />
			<View style={styles.body}>
				<FlatList
					data={books}
					renderItem={({ item, index }) => <BookCard book={item} />}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => (
						<View style={styles.separator}></View>
					)}
				/>
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
	separator: {
		height: 2,
		backgroundColor: "#f1f2f6",
		margin: 30,
	},
});

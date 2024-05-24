import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	FlatListComponent,
} from "react-native";
import { SafeAreaView, ScrollView } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";

// For now...
import { fetchBook } from "../utils/books";

const reviews = [
	{
		id: 1,
		text: "Some text about how good the book was",
	},
	{
		id: 2,
		text: "Some text about how bad the book was",
	},
	{
		id: 3,
		text: "Irrelevant wordage about liking cheese",
	},
	{
		id: 4,
		text: "Rambling on about unrelated stuff",
	},
	{
		id: 5,
		text: "Blah, blah, cabbages",
	},
];

// Uses book state set in Results to display an individual book.

export default function Detail({ navigation, GlobalState }) {
	const { book } = GlobalState;

	return (
		<SafeAreaView style={styles.screen}>
			<Header GlobalState={GlobalState} />
			<View style={styles.body}>
				<View style={styles.book}>
					<BookCard book={book} />
				</View>
				<ScrollView>
					<Text> {book.description} </Text>
				</ScrollView>
				<View style={styles.reviews}>
					<FlatList
						data={reviews}
						renderItem={({ item }) => <ReviewCard review={item} />}
						ItemSeparatorComponent={() => (
							<View style={styles.separator}></View>
						)}
					/>
				</View>
			</View>
			<Footer
				style={styles.footer}
				navigation={navigation}
				GlobalState={GlobalState}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
	},
	body: {
		backgroundColor: "#14141405",
		flexGrow: 1,
	},
	book: {},
	reviews: {
		flex: 1,
	},
	footer: {
		backgroundColor: "#fff",
	},
});

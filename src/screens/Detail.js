import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, ScrollView, Pressable } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";

// For now...
import { fetchBook } from "../utils/books";
import { fetchBooksRecommendations, getBookId } from "../utils/database";

export default function Detail({ navigation, GlobalState }) {
	const { book } = GlobalState;
	const [reviews, setReviews] = useState([
		{
			id: 1,
			text: "This book don't have any review yet. You could be the first!",
		},
	]);

	useEffect(() => {
		getBookId(book.id).then((book) => {
			if (book) {
				fetchBooksRecommendations(book.book_id).then((books) => {
					setReviews(
						books.map((book, index) => {
							return {
								id: index,
								text: book.recommendation_text,
								author: book.author,
							};
						})
					);
				});
			}
		});
	}, []);

	return (
		<SafeAreaView style={styles.screen}>
			{/* <Header GlobalState={GlobalState} style={styles.header} /> */}
			<ScrollView style={styles.body}>
				<View style={styles.book}>
					<BookCard book={book} />
				</View>

				<Text style={styles.description}>{book.description}</Text>

				<View style={styles.reviews}>
					<Text style={styles.reviewTitle}>Book Reviews:</Text>
					{reviews.map((item) => {
						return (
							<View key={item.id}>
								<ReviewCard review={item} />
							</View>
						);
					})}
				</View>
				<Pressable
					onPress={() => {
						navigation.navigate("BookReview", {
							book: book,
						});
					}}
					style={styles.buttons}
					title="Add a review"
				>
					<Text style={styles.ButtonText}>Add a review</Text>
				</Pressable>
			</ScrollView>
			<Footer
				navigation={navigation}
				GlobalState={GlobalState}
				style={styles.footer}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
	},
	header: {
		flex: 1,
	},
	book: {
		padding: 10,
		margin: 10,
	},
	buttons: {
		alignSelf: "center",
		width: 200,
		backgroundColor: "#007AFF",
		borderRadius: 20,
		padding: 12,
		margin: 20,
	},
	description: {
		padding: 10,

		margin: 10,
		textAlign: "justify",
		fontSize: 16,
	},
	reviewTitle: {
		alignSelf: "center",
		padding: 10,
		fontWeight: "bold",
		font: "normal",
	},
	reviews: {
		padding: 10,
	},
	body: {
		flex: 1,
		flexGrow: 3,
		backgroundColor: "#FFF",
		flexBasis: "auto",
		padding: 10,
	},
	ButtonText: {
		alignSelf: "center",
		color: "#FFF",
		fontSize: 16,
		textAlign: "center",
	},
	footer: {
		flex: 1,
		flexShrink: 1,
		flexBasis: "auto",
	},
});

import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import Footer from "../components/Footer";
import { useState } from "react";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import { addBook, addRecommendation, getBookId } from "../utils/database";

export default function BookReview({ GlobalState, route, navigation }) {
	const [review, setReview] = useState("");
	const { session } = GlobalState;
	const { book } = route.params;

	const handleSubmit = async () => {
		await addBook(book)
			.then((data) => {
				addRecommendation(review, data.book_id, session.sub);
				setReview("");
				Alert.alert(
					"Your recommendation is added to the book. Thank you."
				);
			})
			.catch((error) => {
				if (error.code !== "23505") {
					console.log(error)
					Alert.alert(
						"Something went wrong, please try adding your recommendation again."
					);
				} else {
					getBookId(book.id).then((response) => {
						addRecommendation(
							review,
							response.book_id,
							session.sub
						);
						setReview("");
						Alert.alert(
							"Your recommendation is added to the book. Thank you."
						);
					});
				}
			});
	};

	return (
		<View style={styles.container}>
			<Header GlobalState={GlobalState} style={styles.header} />
			<View style={styles.body}>
				<ScrollView style={styles.form}>
					<View style={styles.book}>
						<BookCard book={book} />
					</View>

					<Text style={styles.bold}> Submit your recommendation</Text>
					<TextInput
						style={styles.input}
						multiline={true}
						numberOfLines={4}
						placeholder="Enter your review..."
						value={review}
						onChangeText={(value) => setReview(value)}
					/>
					<TouchableOpacity
						style={styles.buttons}
						title="Submit"
						onPress={handleSubmit}
					>
						<Text style={styles.text}>Submit</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<Footer GlobalState={GlobalState} navigation={navigation} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF",
		width: "100%",
	},
	header: {
		flex: 1,
	},
	image: {
		width: 250,
		height: 250,
		alignSelf: "center",
		resizeMode: "contain",
		marginBottom: 30,
	},
	body: {
		flex: 1,
		flexGrow: 4,
		backgroundColor: "#FFF",
		flexBasis: "auto",
		padding: 10,
		width: "100%",
	},
	form: {
		marginTop: 20,
		width: "100%",
	},
	book: {
		padding: 10,
		margin: 10,
	},
	input: {
		height: 200,
		borderColor: "black",
		borderWidth: 1,
		width: "90%",
		padding: 15,
		borderRadius: 20,
		backgroundColor: "#d3d3d3",
		marginTop: 8,
		alignSelf: "center",
	},
	bold: {
		alignSelf: "center",
		fontWeight: "bold",
	},
	buttons: {
		width: 300,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 12,
		marginTop: 30,
		alignSelf: "center",
	},
	footer: {
		flex: 1,
		flexShrink: 1,
		flexBasis: "auto",
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},
});

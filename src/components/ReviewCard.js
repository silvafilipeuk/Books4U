import { StyleSheet, Text, View } from "react-native";

export default function ReviewCard({ review }) {
	const text = review.text;
	const author = review.author;

	return review.author ? (
		<View style={styles.container}>
			<Text style={styles.textAuthor}>Author: {author} </Text>
			<Text style={styles.text}>{text} </Text>
		</View>
	) : (
		<Text style={styles.text}>{text} </Text>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 10,
		padding: 10,
		width: "100%",
		height: "100%",
		backgroundColor: "#e46161",
		borderRadius: 5,
		shadowColor: "#171717",
		shadowOffset: { width: 1, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
	},
	textAuthor: {
		fontSize: 16,
		paddingBottom: 20,
		fontWeight: "bold",
		color: "white",
	},
	text: {
		fontSize: 16,
		color: "white",
	},
});

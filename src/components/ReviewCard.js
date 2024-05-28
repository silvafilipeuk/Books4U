import { StyleSheet, Text, View } from "react-native";

export default function ReviewCard({ review }) {
	const text = review.text;

	return (
		<View style={styles.container}>
			<Text style={styles.text}> {text} </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		padding: 10,
		width: "100%",
		height: "100%",
		backgroundColor: "red",
	},
	text: {
		fontSize: 16,
	},
});

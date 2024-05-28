import { StyleSheet, Text, View, Image, FlatList } from "react-native";

export default function BookCard({ book }) {
	const thumbnail = book.thumbnail;
	const author = book.author;
	const title = book.title;

	return (
		<View style={styles.container}>
			<Image style={styles.cover} source={{ uri: thumbnail }} />
			<Text style={styles.textTitle}> {title} </Text>
			<Text style={styles.textAuthor}> {author} </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	textTitle: {
		fontSize: 18,
		fontWeight: "400",
		paddingTop: 20,
		paddingBottom: 10,
	},
	textAuthor: {
		fontSize: 18,
		fontWeight: "400",
	},
	cover: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
});

import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
} from "react-native";
import Footer from "../components/Footer";
export default function Member({ navigation, route }) {
	const { name, id } = route.params;
	const reviews = [
		{
			review: "blah blah blah blah",
		},
		{
			review: "blah blah blah blah",
		},
		{
			review: "blah blah blah blah",
		},
	];

	const renderReviews = ({ item }) => (
		<View style={styles.review}>
			<Image
				source={require(`../../assets/gatsby.jpg`)}
				style={styles.Image}
			/>
			<Text>{item.review}</Text>
		</View>
	);
	return (
		<View style={styles.member}>
			<Text style={styles.name}>{name}</Text>
			<FlatList
				data={reviews}
				renderItem={renderReviews}
				keyExtractor={(item, index) => index.toString()}
				style={styles.list}
			/>
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	member: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		padding: 10,
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
		padding: 10,
	},
	list: {
		width: "100%",
		height: "75%",
		backgroundColor: "white",
	},
	review: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#E2DFD0",
		marginBottom: 10,
		padding: "5%",
	},
	Image: {
		width: "40%",
		height: 200,
	},
});

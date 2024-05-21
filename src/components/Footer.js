import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Footer({ navigation }) {
	return (
		<View style={styles.footer}>
			<Icon
				name="home"
				size={30}
				onPress={() => navigation.navigate("Login")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	text: {
		fontSize: 18,
		fontWeight: "900",
	},
});

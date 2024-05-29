import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { getSession } from "../utils/SupabaseClient";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function Footer({ navigation, GlobalState }) {
	const { session } = GlobalState;

	useEffect(() => {
		const getUser = async () => {
			return getSession();
		};
	}, [session]);

	return (
		<View style={styles.footer}>
			<View style={styles.wrap}>
				<Icon
					style={styles.icon}
					name="home"
					size={34}
					onPress={() => navigation.navigate("Login")}
				/>
				{!session ? (
					<Icon
						style={styles.icon}
						name="user-plus"
						size={34}
						onPress={() => navigation.navigate("SignUp")}
					/>
				) : (
					<Icon
						style={styles.icon}
						name="search"
						size={34}
						onPress={() => navigation.navigate("Search")}
					/>
				)}
				<Icon
					style={styles.icon}
					name="group"
					size={34}
					onPress={() => navigation.navigate("Groups")}
				/>
				{session ? (
					<MaterialIcon
						style={styles.icon}
						name="group-add"
						size={34}
						onPress={() => navigation.navigate("CreateGroup")}
					/>
				) : null}
			</View>
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
		height: 30,
		position: "relative",
		marginBottom: Platform.OS === "android" ? 0 : 20,
	},
	text: {
		fontSize: 18,
		fontWeight: "900",
	},
	wrap: {
		flexDirection: "row",
		justifyContent: "space-around",
		position: "absolute",
		left: 0,
		bottom: 0,
		right: 0,
		marginBottom: 14,
	},
	icon:{
		color: '#606060'
	}

});

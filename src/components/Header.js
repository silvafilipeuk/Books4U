import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Constants from "expo-constants";
import { supabase } from "../utils/SupabaseClient";

export default function Header({ GlobalState }) {
	const { session } = GlobalState;

	async function handleLogout() {
		let { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		}
	}

	return (
		<View style={styles.header}>
			<Image
				source={require("../../assets/logo-png.png")}
				style={styles.image}
			></Image>
			{session && session.user ? (
				<View style={styles.wrapper}>
					<Text style={styles.text}>
						{session.user.user_metadata.full_name} -
					</Text>
					<Pressable onPress={handleLogout}>
						<Text style={styles.textLink}> Logout</Text>
					</Pressable>
				</View>
			) : (
				<Text></Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "white",
		paddingTop: Constants.statusBarHeight,
	},
	text: {
		fontSize: 16,
		fontWeight: "400",
	},
	wrapper: {
		display: "flex",
		flexDirection: "row",
	},
	textLink: {
		fontSize: 16,
		fontWeight: "700",
	},
	image: {
		width: "70%",
		height: 100,
		resizeMode: "contain",
	},
});

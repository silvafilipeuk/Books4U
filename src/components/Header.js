import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Constants from "expo-constants";
import { supabase, getSession } from "../utils/SupabaseClient";
import React, { useEffect, useState } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function Header({ GlobalState }) {
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			return getSession();
		};

		getUser().then((user) => {
			setLogged(user);
		});
	}, [logged]);

	async function handleLogout() {
		let { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		}
	}

	return (
		<View style={styles.header}>
			<View style={styles.wrapper}>
				<Image
					source={require("../../assets/logo-png.png")}
					style={styles.image}
				></Image>

				{logged ? (
					<View style={styles.user}>
						<Text style={styles.text}>
							{logged.user_metadata.full_name}
						</Text>
						<Pressable onPress={handleLogout}>
							<MaterialIcon
								style={styles.icon}
								name="logout"
								size={20}
							/>
						</Pressable>
					</View>
				) : (
					<Text></Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		backgroundColor: "white",
		paddingTop: 10,
	},
	text: {
		fontSize: 16,
		fontWeight: "700",
		alignItems: "center",
	},
	user: {
		flexDirection: "row",
		alignItems: "center",
		padding: 0,
		margin: 0,
	},
	icon: {
		marginLeft: 10,
	},
	image: {
		width: 300,
		height: 60,
		padding: 0,
		marginTop: 10,
		resizeMode: "contain",
	},

	wrapper: {
		display: "flex",
		alignItems: "center",
		alignContent: "center",
		flexDirection: "column",
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		paddingTop: Constants.statusBarHeight,
	},
});

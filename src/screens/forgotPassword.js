import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Pressable,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ navigation, GlobalState }) {
	const [formData, setFormData] = useState({ username: "", email: "" });

	const handleChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		console.log(formData);
	};

	return (
		<View style={styles.screen}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.headerText}>Forgot my password</Text>

				<Text>Username:</Text>
				<TextInput
					style={styles.input}
					placeholder="Username"
					value={formData.username}
					onChangeText={(value) => handleChange("username", value)}
				/>
				<Text>E-mail:</Text>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					secureTextEntry
					value={formData.email}
					onChangeText={(value) => handleChange("email", value)}
				/>
				<Pressable
					style={styles.buttons}
					title="Log in"
					onPress={handleSubmit}
				>
					<Text style={styles.text}>Submit</Text>
				</Pressable>
			</View>
			<Footer navigation={navigation} />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0,
	},
	headerText: {
		fontSize: 16,
		fontWeight: "bold",
		padding: 10,
	},
	subHeaderText: {
		fontSize: 18,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 8,
		width: 300,
		borderRadius: 20,
		backgroundColor: "#d3d3d3",
	},
	buttons: {
		width: 300,
		backgroundColor: "black",
		borderRadius: 20,
		margin: 10,
		padding: 12,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},
});

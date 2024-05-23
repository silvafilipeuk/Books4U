import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable,KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreateGroup({ navigation, GlobalState }) {
	const [formData, setFormData] = useState({
		groupname: "",
		description: "",
		genre: "",
	});

	const handleChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		console.log(formData);
	};

	return (
		<KeyboardAvoidingView
      behavior='height'keyboardVerticalOffset={-170}
      style={styles.container}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.screen}>
			<Header />
			<View style={styles.body}>
				<Text style={styles.headerText}>Creating a group.</Text>

				<Text style={styles.Title}>Group Name:</Text>
				<TextInput
					style={styles.input}
					placeholder="Group Name"
					value={formData.username}
					onChangeText={(value) => handleChange("groupname", value)}
				/>
				<Text>Description:</Text>
				<TextInput
					multiline={true}
					numberOfLines={4}
					style={styles.description}
					placeholder="Description"
					secureTextEntry
					value={formData.description}
					onChangeText={(value) => handleChange("description", value)}
				/>
				<Text>Genre:</Text>
				<TextInput
					style={styles.input}
					placeholder="Genre"
					secureTextEntry
					value={formData.genre}
					onChangeText={(value) => handleChange("genre", value)}
				/>
				<Pressable
					style={styles.buttons}
					title="Log in"
					onPress={handleSubmit}
				>
					<Text style={styles.text}>Create Group</Text>
				</Pressable>
			</View>
			<Footer navigation={navigation} />
		</View>
		</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	container:{

		flex:1
	},
	body: {
		backgroundColor: "#fff",
		alignItems: "center",
		marginTop: 0,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		padding: 20,
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
		borderRadius: 5,
		backgroundColor: "#d3d3d3",
	},
	description: {
		height: 100,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 8,
		width: 300,
		borderRadius: 5,
		backgroundColor: "#d3d3d3",
	},
	buttons: {
		width: 300,
		backgroundColor: "black",
		borderRadius: 5,
		margin: 10,
		padding: 12,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},
	Title: {
		fontSize: 16,
		alignItems: "left",
	},
});

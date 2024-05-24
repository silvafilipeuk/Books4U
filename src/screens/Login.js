import React, { useState, useEffect } from "react";

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

import { supabase, getUser } from "../utils/SupabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Alert } from "react-native";
import Search from "./Search";

export default function Login({ navigation, GlobalState }) {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	let { session } = GlobalState;

	const handleChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	async function handleLogin() {
		if (formData.email === "") {
			Alert.alert("Email cannot be empty.");
			return;
		}
		if (formData.password === "") {
			Alert.alert("Password cannot be empty.");
			return;
		}
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			Alert.alert(error.message);
			setLoading(false);
			setFormData({ email: "", password: "" });
		} else {
			setLoading(false);
			navigation.navigate("Search");
		}
	}

	if (loading) {
		return (
			<View style={styles.screen}>
				<Header GlobalState={GlobalState} />
				<View style={styles.body}>
					<Text>Loading...</Text>
				</View>
				<Footer navigation={navigation} GlobalState={GlobalState} />
			</View>
		);
	}

	if (session) {
		return <Search navigation={navigation} GlobalState={GlobalState} />;
	} else {
		return (
			<KeyboardAvoidingView
				behavior="height"
				keyboardVerticalOffset={-130}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.screen}>
						<Header GlobalState={GlobalState} />

						<View style={styles.body}>
							<Text style={styles.headerText}>Login</Text>
							<Text style={styles.subHeaderText}>
								Sign in to continue
							</Text>
							<View style={styles.wrapper}>
								<Text style={styles.bold}> Email:</Text>
								<TextInput
									style={styles.input}
									placeholder="Email"
									value={formData.email}
									onChangeText={(value) =>
										handleChange("email", value)
									}
								/>
							</View>
							<View style={styles.wrapper}>
								<Text style={styles.bold}> Password:</Text>
								<TextInput
									style={styles.input}
									placeholder="Password"
									secureTextEntry
									value={formData.password}
									onChangeText={(value) =>
										handleChange("password", value)
									}
								/>
							</View>
							<View style={styles.wrapper}>
								<Pressable
									style={styles.buttons}
									title="Log in"
									onPress={handleLogin}
								>
									<Text style={styles.text}>Log in</Text>
								</Pressable>
							</View>
							<Pressable
								title="Sign up"
								onPress={() => navigation.navigate("SignUp")}
							>
								<Text style={styles.subHeaderText}>
									Don't have an account yet? Sign Up!
								</Text>
							</Pressable>
						</View>
						<Footer
							navigation={navigation}
							GlobalState={GlobalState}
						/>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	container: {
		flex: 1,
	},

	body: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0,
	},
	headerText: {
		fontSize: 38,
		fontWeight: "bold",
	},
	subHeaderText: {
		fontSize: 18,
		padding: 10,
	},
	input: {
		height: 48,
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
		padding: 12,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},
	wrapper: {
		marginTop: 20,
	},

	bold: {
		fontWeight: "bold",
	},
});

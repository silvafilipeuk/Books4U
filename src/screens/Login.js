import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { supabase } from "../utils/SupabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Alert } from "react-native";

export default function Login({ navigation, GlobalState }) {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	let { session } = GlobalState;

	const handleChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	async function handleLogout() {
		setLoading(true);
		setFormData({ email: "", password: "" });
		let { error } = await supabase.auth.signOut();

		if (error) {
			setLoading(true);
			Alert.alert(error.message);
			setLoading(false);
		}
		setLoading(false);
	}

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
			navigation.navigate("Home");
		}
	}

	if (loading) {
		return (
			<View style={styles.screen}>
				<Header />
				<View style={styles.body}>
					<Text>Loading...</Text>
				</View>
				<Footer navigation={navigation} />
			</View>
		);
	}

	if (session && session.user) {
		return (
			<View style={styles.screen}>
				<Header />
				<View style={styles.body}>
					<Text style={styles.subHeaderText}>
						Logged as: {session.user.email}
					</Text>
					<Pressable
						style={styles.buttons}
						title="Log out"
						onPress={handleLogout}
					>
						<Text style={styles.text}>Log Out</Text>
					</Pressable>
				</View>
				<Footer navigation={navigation} />
			</View>
		);
	} else {
		return (
			<View style={styles.screen}>
				<Header />
				<View style={styles.body}>
					<Text style={styles.headerText}>Login</Text>
					<Text style={styles.subHeaderText}>
						Sign in to continue
					</Text>
					<Text>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Email"
						value={formData.email}
						onChangeText={(value) => handleChange("email", value)}
					/>
					<Text>Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Password"
						secureTextEntry
						value={formData.password}
						onChangeText={(value) =>
							handleChange("password", value)
						}
					/>
					<Pressable
						style={styles.buttons}
						title="Log in"
						onPress={handleLogin}
					>
						<Text style={styles.text}>Log in</Text>
					</Pressable>
					<Pressable
						title="Sign up"
						onPress={() => navigation.navigate("SignUp")}
					>
						<Text style={styles.subHeaderText}>
							Don't have an account yet? Sign Up!
						</Text>
					</Pressable>
				</View>
				<Footer navigation={navigation} />
			</View>
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
		padding: 12,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},
});

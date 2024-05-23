import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { supabase } from "../utils/SupabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignUp({ navigation, GlobalState }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ name: "", email: "", password: "" });
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const validateName = (name) => {
		const nameRegex = /^[a-zA-Z\s]+$/;
		return nameRegex.test(name);
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		const passwordRegex = /^.{6,}$/;
		return passwordRegex.test(password);
	};

	const newPage = () => {
		navigation.navigate("Login");
	};

	async function handleSubmit(e) {
		e.preventDefault();

		let valid = true;
		let errors = { name: "", email: "", password: "" };

		if (!validateName(name)) {
			errors.name =
				"Please enter a valid name (letters and spaces only).";
			valid = false;
		}

		if (!validateEmail(email)) {
			errors.email = "Please enter a valid email address.";
			valid = false;
		}

		if (!validatePassword(password)) {
			errors.password = "Your password should have at least 6 characters";
			valid = false;
		}

		setErrors(errors);

		if (valid) {
			setLoading(true);
			const { error } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						full_name: name,
					},
				},
			});

			if (error) {
				Alert.alert(error.message);
				setLoading(false);
				setSubmitted(false);
			} else {
				setLoading(false);
				setSubmitted(true);
			}
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

	if (submitted) {
		return (
			<View style={styles.screen}>
				<Header GlobalState={GlobalState} />
				<ScrollView>
					<View style={styles.body}>
						<Text style={styles.signup}>
							Thank you, you have now registered with Books 4 U.
						</Text>
						<Text style={styles.signup}>
							We have sent you a confirmation e-mail to validate
							your account!
						</Text>
					</View>
				</ScrollView>

				<Footer navigation={navigation} GlobalState={GlobalState} />
			</View>
		);
	} else {
		return (
			<KeyboardAvoidingView
      behavior='height'keyboardVerticalOffset={-170}
      style={styles.container}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.screen}>
				<Header GlobalState={GlobalState} />
				<ScrollView>
					<View style={styles.body}>
						<Text style={styles.headerText}>
							Create New Account
						</Text>
						<Text style={styles.subHeaderText} onPress={newPage}>
							Already registered? Login here
						</Text>
						<View style={styles.wrapper}>
							<Text style={styles.bold}> Name:</Text>
							<TextInput
								style={styles.input}
								placeholder="Name"
								value={name}
								onChangeText={(value) => setName(value)}
								keyboardAppearance="text"
							/>
							{errors.name ? (
								<Text style={styles.error}>{errors.name}</Text>
							) : null}
						</View>
						<View style={styles.wrapper}>
							<Text style={styles.bold}> Email:</Text>
							<TextInput
								style={styles.input}
								placeholder="Email"
								value={email}
								onChangeText={(value) => setEmail(value)}
								keyboardType="email-address"
							/>
							{errors.email ? (
								<Text style={styles.error}>{errors.email}</Text>
							) : null}
						</View>
						<View style={styles.wrapper}>
							<Text style={styles.bold}> Password:</Text>
							<TextInput
								style={styles.input}
								placeholder="Password"
								value={password}
								secureTextEntry={true}
								onChangeText={(value) => setPassword(value)}
								keyboardType="password"
							/>
							{errors.password ? (
								<Text style={styles.error}>
									{errors.password}
								</Text>
							) : null}
						</View>

						<TouchableOpacity
							style={styles.buttons}
							title="Sign up"
							onPress={handleSubmit}
						>
							<Text style={styles.text}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<Footer navigation={navigation} GlobalState={GlobalState} />
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
	body: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
	},
	container:{

		flex:1
	},
	headerText: {
		fontSize: 32,
		fontWeight: "bold",
	},
	subHeaderText: {
		fontSize: 18,
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
		marginTop: 8,
	},
	buttons: {
		width: 300,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 12,
		marginTop: 30,
	},
	text: {
		color: "white",
		fontSize: 22,
		textAlign: "center",
	},

	error: {
		color: "red",
		marginBottom: 10,
	},
	wrapper: {
		marginTop: 20,
	},
	bold: {
		fontWeight: "bold",
	},
	signup: {
		marginTop: 20,
		color: "black",
		textAlign: "center",
		fontWeight: "bold",
	},
});

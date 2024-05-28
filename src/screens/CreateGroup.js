import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable,KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupabaseClient";
import { isLoggedIn } from "../utils/database";

export default function CreateGroup({ navigation, GlobalState }) {
	
	const[groupName,setGroupName]=useState('')
	const[description, setDescription]=useState('')
	const [errors, setErrors] = useState({ groupName: "", description: "" });
	const validateGroup = (groupName) => {
		const groupRegex = /^[a-zA-Z\s]{6,30}$/;
		return groupRegex.test(groupName);
	};

	const validateDescription = (description) => {
		const descriptionRegex = /^[a-zA-Z0-9]{6,}$/;

		return descriptionRegex.test(groupName);
	};

	

	const addGroup =async(group_name, group_description) => {
		
			try{
				const addToGroup = await supabase
				.from('groups')
				.insert({group_name, group_description})
				setGroupName('')
				setDescription('')
			}
			catch(err){
				console.log(err)
			}
	
	  }
	

	  const handlePress = () => {

		let valid=true;
		let errors={ groupName: "", description: "" }


		if (!validateGroup(groupName)) {
			valid=false
			errors.groupName='Group name should contain only letters, should have a minimum of 6 characters and maximum of 30 characters. Please try again'
		}
		if(!validateDescription(description)){

			valid=false;
			errors.description='This field must have a minimum of 6 characters. Please try again'
		}
		setErrors(errors);

		if (valid) {
			addGroup(groupName, description);
		}

		
	  };
	  
	return (
		<KeyboardAvoidingView
      behavior='height'keyboardVerticalOffset={-170}
      style={styles.container}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.screen}>
			<Header GlobalState={GlobalState} />
			<View style={styles.body}>
				<Text style={styles.headerText}>Creating a group.</Text>

				<Text style={styles.Title}>Group Name:</Text>
				<TextInput
					style={styles.input}
					placeholder="Group Name"
					value={groupName}
					onChangeText={(value) => setGroupName(value)}
				/>
				{errors.groupName ?( <Text style={{ color: 'red' }}>{errors.groupName}</Text>) : null}
				<Text>Description:</Text>
				<TextInput
					multiline={true}
					numberOfLines={4}
					style={styles.description}
					placeholder="Description"
					secureTextEntry
					value={description}
					onChangeText={(value) =>setDescription(value)}
				/>
				{errors.description ?( <Text style={{ color: 'red' }}>{errors.description}</Text>) : null}
				
				<Pressable
					style={styles.buttons}
					title="Log in"
					onPress={handlePress}
				>
					
					<Text style={styles.text}>Create Group</Text>
				</Pressable>
				
			</View>
			<Footer navigation={navigation} GlobalState={GlobalState} />
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

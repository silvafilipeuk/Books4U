
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import CreateGroup from './CreateGroup';


export default function Groups({ navigation, GlobalState }) {
	const groups = [
		{
			id: 1,
			name: "Group 1",
			genre: "Comedy",
			description: "blah blah blah ",
		},
		{
			id: 2,
			name: "Group 2",
			genre: "Fantasy",
			description:
				"blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah  ",
		},
		{
			id: 3,
			name: "Group 3",
			genre: "History",
			description: "blah blah blah ",
		},
		{
			id: 4,
			name: "Group 4",
			genre: "History",
			description: "blah blah blah ",
		},
		{
			id: 5,
			name: "Group 5",
			genre: "History",
			description: "blah blah blah ",
		},
	];
	const renderBook = ({ item }) => (
		<TouchableOpacity
			style={styles.box}
			onPress={() => {
				navigation.navigate("Group", { id: item.id });
			}}
		>
			<Text style={styles.groupName}>{item.name}</Text>
			<Text>Genre:</Text>
			<Text>{item.genre}</Text>
			<Text>About us:</Text>
			<Text>{item.description}</Text>
			<TouchableOpacity style={styles.button}>
				<Text>Click to join 📚</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<React.Fragment>
			<Header GlobalState={GlobalState} />
			<View style={styles.screen}>
				<FlatList
					keyExtractor={(item) => item.id}
					data={groups}
					renderItem={renderBook}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			<Footer navigation={navigation} GlobalState={GlobalState} />
		</React.Fragment>
	);

}
const styles = StyleSheet.create({
	screen: {
		flex: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		padding: "5%",
	},
	box: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "#E2DFD0",
		width: "100%",
		marginTop: 0,
		marginBottom: 10,
		borderRadius: 5,
		padding: 5,
	},
	button: {
		marginTop: 10,
		backgroundColor: "#E6FF94",
		padding: 10,
		borderRadius: 5,
	},
	groupName: {
		fontSize: 22,
		fontWeight: "bold",
	},
});

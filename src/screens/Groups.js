import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupabaseClient";
import CreateGroup from "./CreateGroup";

export default function Groups({ navigation, GlobalState }) {
	const [fetchError, setFetchError] = useState(null);
	const [groups, setGroups] = useState(null);

	useEffect(() => {
		const fetchGroups = async () => {
			const { data, error } = await supabase.from("groups").select();

			if (error) {
				setFetchError("cannot fetch groups");
				setGroups(null);
			}
			if (data) {
				setGroups(data);
				setFetchError(null);
			}
		};

		fetchGroups();
	}, []);

	const renderBook = ({ item }) => (
		<TouchableOpacity
			style={styles.box}
			onPress={() => {
				navigation.navigate("Group", {
					groupName: item.group_name,
					groupId: item.group_id,
				});
			}}
		>
			<Text style={styles.groupName}>{item.group_name}</Text>
			<Text>About us:</Text>
			<Text>{item.group_description}</Text>
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
					keyExtractor={(item) => item.group_id}
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
		marginTop: 60,
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

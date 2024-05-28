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
import Constants from "expo-constants";
import CreateGroup from "./CreateGroup";

import { fetchGroups, fetchUsersGroupsData } from "../utils/database";

export default function Groups({ navigation, GlobalState }) {
	const { session } = GlobalState;
	const [fetchError, setFetchError] = useState(null);
	const [groups, setGroups] = useState([]);
	const [join, setJoin] = useState(null);
	const [usersGroupsData, setUsersGroupsData] = useState([]);

	useEffect(() => {
		const fetchAllData = async () => {
			await fetchUsersGroupsData(setUsersGroupsData);
			await fetchGroups(setFetchError, setGroups);
		};

		fetchAllData();
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
		</TouchableOpacity>
	);

	return (
		<View style={styles.body}>
			<Header GlobalState={GlobalState} />
			<View style={styles.screen}>
				<Text style={styles.info}>Click on the tiles to view group!</Text>
				<FlatList
					keyExtractor={(item) => item.group_id}
					data={groups}
					renderItem={renderBook}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<Footer navigation={navigation} GlobalState={GlobalState} />
		</View>
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
	body: {
		flex: 1,
		backgroundColor: "white",
	},
	info:{
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10
	}
	,
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

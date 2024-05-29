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
			<Text style={{textAlign: 'justify'}}>{item.group_description}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.body}>
			<Header GlobalState={GlobalState} />
			<View style={styles.screen}>
				<Text style={styles.info}>Click on the tiles to view group!</Text>
				<FlatList
					keyExtractor={(item) => item.group_id}
					ItemSeparatorComponent={() => (
						<View style={styles.separator}></View>)}
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
		flex: 9,
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
		marginBottom: 10,
		color: '#606060'
	}
	,
	box: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		marginTop: 10,
		marginBottom: 10,
		padding: 5,
	},
	groupName: {
		fontSize: 22,
		fontWeight: "bold",
		color: '#007AFF',
		marginBottom: 10
	},
	separator: {
		height: 3,
		backgroundColor: "#606060",
		margin: 30,
	}
});

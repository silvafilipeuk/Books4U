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
import { isUserOnGroup, fetchGroups } from "../utils/database";

export default function Groups({ navigation, GlobalState }) {
	const { session } = GlobalState;
	const [fetchError, setFetchError] = useState(null);
	const [groups, setGroups] = useState(null);
	const [join, setJoin] = useState(false);

	useEffect(() => {
		fetchGroups()
			.then((groups) => {
				setGroups(groups);
			})
			.catch((error) => {
				setFetchError(error);
			});
	}, []);

	const joinGroup = async (groupId) => {
		try {
			const addToGroup = await supabase
				.from("users_groups")
				.insert({ user_id: session.sub, group_id: groupId });
		} catch (err) {
			console.log(err);
		}
		setJoin(true);
	};

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
			<TouchableOpacity
				style={styles.button}
				onPress={() => joinGroup(item.group_id)}
			>
				<Text>Click to join 📚</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<View style={styles.body}>
			{join ? (
				<View style={styles.successHeader}>
					<Text style={styles.success}>
						Successfully joined group.
					</Text>
				</View>
			) : (
				<Header GlobalState={GlobalState} />
			)}

			<View style={styles.screen}>
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
		padding: "5%",
		backgroundColor: "white",
	},
	successHeader: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		paddingTop: Constants.statusBarHeight,
	},
	success: {
		fontSize: 22,
		fontWeight: "bold",
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

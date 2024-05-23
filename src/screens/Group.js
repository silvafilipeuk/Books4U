import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
} from "react-native";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function Group({ navigation, route, GlobalState }) {
	const { groupName, groupId } = route.params;
	const [groupMembers, setGroupMembers] = useState([]);

	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		const fetchGroupMembers = async () => {
			const { data, error } = await supabase
				.from("profile")
				.select("full_name,id, users_groups!inner(user_id)")
				.eq("users_groups.group_id", groupId);

			if (error) {
				setFetchError("Cannot fetch group members.");
				setGroupMembers(null);
			}
			if (data) {
				setGroupMembers(data);
				setFetchError(null);
			}
		};

		fetchGroupMembers();
	}, []);

	const members = groupMembers.map((member) => {
		return { name: member.full_name, id: member.id };
	});

	const renderedMembers = ({ item }) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("Member", { name: item.name, id: item.id });
			}}
		>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.body}>
			<View style={styles.top}>
				<Text>{groupName}</Text>
				<TouchableOpacity>
					<Text>Leave Group</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.group}>
				<Text style={styles.groupName}>{groupName}</Text>
				<Text style={styles.members}>Members</Text>
				<FlatList
					data={members}
					renderItem={renderedMembers}
					keyExtractor={(item, index) => index.toString()}
					style={styles.memberList}
				/>
				<Text style={styles.recommendations}>
					Users recommendations:
				</Text>
				<View style={styles.container}>
					<Image
						source={require("../../assets/gatsby.jpg")}
						style={styles.Image}
					/>
					<Image
						source={require("../../assets/Harry_Potter.jpg")}
						style={styles.Image}
					/>
					<Image
						source={require("../../assets/Million.webp")}
						style={styles.Image}
					/>
					<Image
						source={require("../../assets/Million.webp")}
						style={styles.Image}
					/>
				</View>
			</View>
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		padding: "5%",
		backgroundColor: "white",
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "0%",
	},
	group: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E2DFD0",
		marginTop: "5%",
		borderRadius: 5,
		padding: 5,
	},
	groupName: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: "5%",
	},
	members: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: "3%",
	},
	memberList: {
		marginBottom: "5%",
	},
	recommendations: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: "3%",
	},
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		width: "100%",
	},
	Image: {
		width: "40%",
		height: 200,
		margin: 5,
	},
});

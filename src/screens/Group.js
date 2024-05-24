import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
	Alert,
} from "react-native";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
	fetchGroupMembers,
	fetchGroupRecommendations,
} from "../utils/database";

export default function Group({ navigation, route, GlobalState }) {
	const { groupName, groupId } = route.params;
	const [groupMembers, setGroupMembers] = useState([]);
	const [groupRecommendations, setGroupRecommendations] = useState([]);

	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		fetchGroupMembers(groupId)
			.then((members) => {
				setGroupMembers(members);

				Promise.all(
					members.map((user) => fetchGroupRecommendations(user.id))
				)
					.then((recommendations) => {
						setGroupRecommendations(recommendations);
						setFetchError(null);
					})
					.catch((error) => {
						setFetchError("Error fetching group data: ");
						Alert.alert(fetchError + error);
					});
			})
			.catch((error) => {
				setFetchError("Error fetching group members: ");
				Alert.alert(fetchError + error);
			});
	}, []);



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
					data={groupMembers}
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
			<Footer navigation={navigation} GlobalState={GlobalState} />
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

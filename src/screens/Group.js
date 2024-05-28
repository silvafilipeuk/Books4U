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
	fetchUserRecommendations,
	isUserOnGroup,
	deleteUserGroup,
	addUserGroup,
} from "../utils/database";

export default function Group({ navigation, route, GlobalState }) {
	const { session } = GlobalState;
	const { groupName, groupId } = route.params;
	const [groupMembers, setGroupMembers] = useState([]);
	const [groupRecommendations, setGroupRecommendations] = useState([]);
	const [isMember, setIsMember] = useState(false);

	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		fetchGroupMembers(groupId)
			.then((members) => {
				setGroupMembers(members);
				if (session) {
					isUserOnGroup(session.sub, groupId).then((membership) => {
						setIsMember(membership);
					});
				}

				Promise.all(
					members.map((user) => fetchUserRecommendations(user.id))
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
	}, [isMember]);

	const handleJoinLeave = async () => {
		if (isMember) {
			//handle leave group

			Alert.alert(
				"Leaving Group",
				"Are you sure you want to leave the group?",
				[
					{
						text: "Yes",
						onPress: () =>
							deleteUserGroup(session.sub, groupId)
								.then(() => {
									Alert.alert("You have left the group!");
									setIsMember(false);
								})
								.catch(() => {
									Alert.alert(
										"We could not process your request to leave the group. Please try again."
									);
								}),
					},
					{
						text: "Cancel",
						style: "cancel",
					},
				]
			);
		} else {
			//handle join group
			addUserGroup(session.sub, groupId)
				.then(() => {
					Alert.alert("You have joined the group!");
					setIsMember(true);
				})
				.catch(() => {
					Alert.alert(
						"We could not process your request to join the group. Please try again."
					);
				});
		}
	};

	let recommendations = groupRecommendations
		.filter((elem) => elem.length)
		.map((userRecommentations) => {
			return userRecommentations.map(
				(recommendation) => recommendation.book_cover_url
			);
		});

	recommendations = recommendations.flat();
	recommendations = recommendations.filter((url, index) => {
		return recommendations.indexOf(url) === index;
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
				{session ? (
					<Text style={styles.headerText}>
						User: {session.full_name}
					</Text>
				) : (
					<Text style={styles.headerText}>{groupName}</Text>
				)}

				<TouchableOpacity onPress={handleJoinLeave}>
					{isMember ? (
						<Text style={styles.headerText}>Leave Group</Text>
					) : session ? (
						<Text style={styles.headerText}>Join Group</Text>
					) : (
						<Text></Text>
					)}
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
					{recommendations.map((url, index) => (
						<Image
							key={index}
							source={{ uri: url }}
							style={styles.Image}
						/>
					))}
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
		height:'100%'
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "0%",
	},
	group: {
		flex:7,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E2DFD0",
		marginTop: 20,
		borderRadius: 5,
		paddingTop: 60,
		paddingBottom:80

		
		
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
	headerText: {
		fontWeight: "bold",
	},
});

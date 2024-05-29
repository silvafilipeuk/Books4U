import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
	Alert,
	ScrollView
	
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
// import { ScrollView } from "react-native-web";

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
			<Text style={styles.names}>{item.name}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.body}>
			<View style={styles.top}>
				{session ? (
					<Text style={styles.headerText}>
						{session.full_name}
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
				<ScrollView>
				<View style={styles.container}>
			
					{recommendations.map((url, index) => (
						<Image
							key={index}
							source={{ uri: url }}
							style={styles.Image}
						/>
					))}
					
				</View>
				</ScrollView>
			</View>
			
			
			<Footer navigation={navigation} GlobalState={GlobalState} />
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "white",

    	paddingLeft: '5%',
		paddingRight: '5%',
		paddingTop: '5%'

	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "0%",
	},
	group: {
		flex:9,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderRadius: 5,
		paddingBottom:5,
		marginTop:2,
		paddingTop:5	
	},
	groupName: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: "5%",
		color: '#606060'
	},
	members: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: "0%",
		color: '#606060'

	},
	memberList: {
		marginBottom: 0,
		height: 240
	},
	recommendations: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: "3%",
		color: '#606060'
	},
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		
		width: "100%",
		height:'100%'
		
	},
	Image: {
		width: "40%",
		height: 200,
		margin: 5,
	},
	headerText: {
		fontWeight: "bold",
		color: '#606060'
	},
	names:{
		borderWidth: 2,
		borderColor: 'white',
		textAlign: 'center',
		padding: 5,
		margin: '2%',
		color: 'white',
		backgroundColor: '#007AFF' 
	}
});

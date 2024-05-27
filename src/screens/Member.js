import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
} from "react-native";
import Footer from "../components/Footer";
import { fetchUserRecommendations } from "../utils/database";

import { useEffect, useState } from "react";

export default function Member({ navigation, route, GlobalState }) {
	const { name, id } = route.params;

	const [bookData, setBookData]=useState([]);
	
	useEffect(() => {
		fetchUserRecommendations(id)
			.then((reviews) => {
				setBookData(reviews);
			
			})

	}, []);

	

	return (
		<View style={styles.member}>
			<Text style={styles.name}>{name}</Text>
			<FlatList
			style={styles.list}
			data={bookData}
			renderItem={({item})=>(
				<View style={styles.review}>
				<Image source={{ uri: item.book_cover_url }}
				style={styles.Image}>

				</Image>
				<View style={styles.wrap}>
				<Text style={styles.title}>{item.book_title}</Text>
				<Text style={styles.txt}>"{item.recommendation_text}"</Text>
				</View>
				
				</View>

			)}
			/>
			
			<Footer navigation={navigation} GlobalState={GlobalState} />
		</View>
	);
}

const styles = StyleSheet.create({
	member: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		padding: 10,
		display:'flex',
		flexWrap:'wrap',
		boxSizing:'border-box'
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
		padding: 10,
	},
	wrap:{
		marginLeft:50

	},
	title:{
		padding:0,
		marginTop:50,
		textAlign:'center',
		fontSize:24
	},

	txt:{

		color:'black',
		fontSize:17,
		fontWeight:'bold',
		marginTop:20,
		position:'fixed'
		
		
	},
	list: {
		width: "100%",
		height: "70%",
		backgroundColor: "white",
	},
	review: {
		
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fcf7ca",
		marginBottom: 10,
		padding: "5%",
		
		
	},
	Image: {
		width: '30%',
		height: 210,
		resizeMode: 'contain',
		
	},
});

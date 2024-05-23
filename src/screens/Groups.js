

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { supabase } from '../utils/SupabaseClient';
import Constants from "expo-constants";
import CreateGroup from './CreateGroup';

export default function Groups({ navigation, GlobalState }) {
	const [user, setUser] = useState(null)
	const [fetchError, setFetchError] = useState(null)
	const [groups, setGroups] = useState(null)
	const [join, setJoin] = useState(false)

	useEffect(() => {
		const fetchGroups = async () =>{
			const { data, error} = await supabase
			.from('groups')
			.select()

			if(error){
				setFetchError("cannot fetch groups")
				setGroups(null)
			}
			if(data){
				setGroups(data)
				setFetchError(null)
			}
		}
		setUser(GlobalState.session.user.identities[0].id)
		fetchGroups()
	},[])

	const joinGroup = async (groupId) => {
		try{
			const addToGroup = await supabase
			.from('users_groups')
			.insert({user_id: user, group_id: groupId})
		}
		catch(err){
			console.log(err)
		}
		setJoin(true)
		
	}
	
	const renderBook = ({ item }) => (
		<TouchableOpacity
			style={styles.box}
			onPress={() => {
				navigation.navigate("Group", { groupName: item.group_name });
			}}
		>
			<Text style={styles.groupName}>{item.group_name}</Text>
			<Text>About us:</Text>
			<Text>{item.group_description}</Text>
			<TouchableOpacity style={styles.button} onPress={() => joinGroup(item.group_id)}>
				<Text>Click to join 📚</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);

	return (
		<React.Fragment>
			{join ? (<View style={styles.successHeader}>
				<Text style={styles.success}>Successfully joined group</Text>
				</View>)
				: 
				(<Header GlobalState={GlobalState} />)}
			
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '5%',
        marginTop:60
    },
	successHeader : {
		flex: 1,
    	width: "100%",
    	alignItems: 'center',
    	justifyContent: 'center',
    	backgroundColor: 'white',
    	paddingTop: Constants.statusBarHeight
	},
	success: {
		fontSize: 22,
		fontWeight: 'bold'
	},
    box: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E2DFD0',
        width: '100%',
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 5,
        padding: 5
    },
    button: {
        marginTop: 10,
        backgroundColor: '#E6FF94',
        padding: 10,
        borderRadius: 5
    },
    groupName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
})


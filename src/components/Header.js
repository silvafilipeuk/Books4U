import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Constants from "expo-constants";
import { supabase } from "../utils/SupabaseClient";
import React from "react";


export default function Header({ GlobalState }) {
	const { session } = GlobalState;

	async function handleLogout() {
		let { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert(error.message);
		}
	}

	return (
		<View style={styles.header}>
        	<View style={styles.wrapper}>
			<Image
				source={require("../../assets/logo-png.png")}
				style={styles.image}
			></Image>
      


			{session && session.user ? (
        <React.Fragment>
					<Text style={styles.text}>
						{session.user.user_metadata.full_name} -
					</Text>
					<Pressable onPress={handleLogout}>
						<Text style={styles.textLink}> Logout</Text>
					</Pressable>
          </React.Fragment>
			
        
			) : (
				<Text></Text>
			)}
      </View>
		</View>
	);
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight
  },
  text: {
    fontSize: 18,
    fontWeight: "900"
  },
  image: {
    width: 400,
    height: 100,
    resizeMode: 'contain'
  },

  wrapper:{


    position:'absolute',
    left:0,
    top:0,
    right:0,
    marginTop:50
  }
});


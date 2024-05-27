import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import Footer from "../components/Footer";
import { useState } from "react";


export default function BookReview({GlobalState, navigation}){

const[body,setBody]=useState('')

const handleSubmit=(e)=>{

    e.preventDefault();
}

return(
    <View style={styles.container}>
    <Image source={require('../../assets/Harry_Potter.jpg')} style={styles.image}/>

    <View style={styles.form}>
    <Text style={styles.bold}> Submit your recommendation</Text>
	<TextInput
    style={styles.input}
    secureTextEntry
    multiline={true}
	numberOfLines={4}
    
    placeholder="Enter your review"
    value={body}
    onChangeText={(value) => setBody(value)}
    
/>
<TouchableOpacity
    style={styles.buttons}
	title="Submit"
	onPress={handleSubmit}
>
<Text style={styles.text}>Submit</Text>
</TouchableOpacity>
								

    </View>
    
</View>
    
)
}

const styles=StyleSheet.create({

    container:{

        flex:1,
        alignItems: "center",
		justifyContent: 'center',
        marginTop:130

    },

    image:{

        width:300,
        height:360,
        marginTop:-160,
        resizeMode: 'contain'
    },

    form:{

        marginTop:20
    },

    input: {
		height: 200,
		borderColor: "black",
		borderWidth: 2,
		marginBottom: 12,
		paddingLeft: 8,
		width: 300,
		borderRadius: 20,
		backgroundColor: "#d3d3d3",
		marginTop: 8,
	},

    bold:{
        fontWeight:'bold'
    },

    buttons: {
		width: 300,
		backgroundColor: "black",
		borderRadius: 20,
		padding: 12,
		marginTop: 30,
	},

    text:{

        color:'white',
        fontSize: 22,
		textAlign: "center",
    }

})
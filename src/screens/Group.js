import { StyleSheet, TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import Footer from "../components/Footer";


export default function Group({navigation, route}){
    const id = route.params

    const members = ['member 1', 'member 2', 'member 3', 'member 4', 'member 5']

    const renderedMembers = ({item}) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Member', {name: item})
        }}><Text>{item}</Text></TouchableOpacity>
    )

    return(
        <View style={styles.body}>
            <View style={styles.top}>
                <Text>Group {id.id}</Text>
                <TouchableOpacity>
                    <Text>Leave Group</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.group}>
                <Text style={styles.groupName}>You joined Group {id.id}</Text>
                <Text style={styles.members}>Members</Text>
                <FlatList 
                data={members}
                renderItem={renderedMembers}
                keyExtractor={(item, index) => index.toString()}
                style={styles.memberList}/>
                <Text style={styles.recommendations}>Top recommendations</Text>
                <View style={styles.container}>
                    <Image source={require('../../assets/gatsby.jpg')} style={styles.Image}/>
                    <Image source={require('../../assets/Harry_Potter.jpg')} style={styles.Image}/>
                    <Image source={require('../../assets/Million.webp')} style={styles.Image}/>
                    <Image source={require('../../assets/Million.webp')} style={styles.Image}/>
                </View>
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        padding: '5%',
        backgroundColor: 'white'
    },
    top:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '0%'
    },
    group:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2DFD0',
        marginTop: '5%',
        borderRadius: 5,
        padding: 5
    },
    groupName:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    members:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3%'
    },
    memberList:{
        marginBottom: '5%'
    },
    recommendations:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3%'
    },
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%'
    },
    Image:{
        width: '40%',
        height: 200,
        margin: 5
    }
})
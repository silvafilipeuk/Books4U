import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


export default function Footer({ navigation }) {
  return (
    <View style = {styles.footer}>
      <View style= {styles.wrap}>
      
      <Icon style={styles.icon}
        name = 'home'
        size = {34}
        onPress = {() => navigation.navigate('Login')}
      />
      <Icon style={styles.icon}
        name = 'user-plus'
        size = {34}
        onPress = {() => navigation.navigate('SignUp')}
      />
      <Icon style={styles.icon}
        name = 'group'
        size = {34}
        onPress = {() => navigation.navigate('Groups')}
      />
      <MaterialIcon style={styles.icon}
      name='group-add'
      size={34}
      onPress = {() => navigation.navigate('CreateGroup')}
      /> 
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
   
    
  },
  text: {
    fontSize: 18,
    fontWeight: "900"
  },
  wrap:{

    flexDirection:'row',
    justifyContent:'space-around',
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
    marginBottom:40
  },
  icon:{

    marginHorizontal:20
  }
});

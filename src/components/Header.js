import { StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Header() {
  return (
    <View style = {styles.header}>
      <Image source={require('../../assets/logo-png.png')} style={styles.image}></Image>
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
  }
});
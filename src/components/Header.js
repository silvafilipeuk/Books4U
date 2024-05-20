import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function Header() {
  return (
    <View style = {styles.header}>
      <Text style = {styles.text}> Books4U </Text>
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
  }
});
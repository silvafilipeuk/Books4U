import { StyleSheet, Text, View } from 'react-native';

export default function ReviewCard({ review }) {
  const text = review.text;

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}> {text} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,

    margin: 30,
  },
  text: {
    fontSize: 12
  },
});
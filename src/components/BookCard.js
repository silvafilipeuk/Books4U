import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function BookCard({ book }) {
  const thumbnail = book.thumbnail;
  const author = book.author;
  const title = book.title;
  console.log(author);

  return (
    <View style = {styles.container}>
      <Image
        style = {styles.cover}
        source = {{ uri: thumbnail }}
      />
      <Text style = {styles.text}> {title} </Text>
      <Text style = {styles.text}> {author} </Text>
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
    zIndex: 5
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    paddingTop: 6
  },
  cover: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  }
});
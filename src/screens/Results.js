import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

import { fetchFromGoogle } from "../utils/books";
import { searchMistral, parseResponse } from "../utils/mistral";

export default function Results({ navigation, GlobalState }) {
	const { searchQuery } = GlobalState;

	const [book, setBook] = useState("");
	const [books, setBooks] = useState([]);
	const [suggestedBooks, setSuggestedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Will expect title and author to be passed in globals.
	const title = "Cold Comfort Farm";
	const author = "Stella Gibbons";

  useEffect(() => {
    const query = searchQuery.trim();
    if (query) {
      setIsLoading(true);

      searchMistral(query)
        .then(response => {
          const bookList = parseResponse(response);
          setSuggestedBooks(bookList);
          setIsLoading(false);
        });
    }
  }, [searchQuery]);

	useEffect(() => {
    if (suggestedBooks.length > 0) {
      setIsLoading(true);

      fetchFromGoogle(suggestedBooks)
        .then((books) => {
          setBooks([...books]);
          setIsLoading(false);
        });
    }
	}, [suggestedBooks]);

	if (isLoading) return (
    <View style={styles.screen}>
      <ActivityIndicator />
    </View>
  );

	return (
    <SafeAreaView style = {styles.screen}>
      <Header GlobalState={GlobalState} />
			<View style={styles.body}>
				<FlatList
					data={books}
					renderItem={({ item, index }) => <BookCard book={item} />}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => (
						<View style={styles.separator}></View>
					)}
				/>
			</View>
      <Footer navigation={navigation} GlobalState={GlobalState} />
    </SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
    flex: 8,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "#14141405",
	},
	separator: {
		height: 2,
		backgroundColor: "#f1f2f6",
		margin: 30,
	},
  footer: {
    justifyContent: "flex-end"
  }
});

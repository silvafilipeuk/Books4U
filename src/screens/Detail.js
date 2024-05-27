import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  
  FlatListComponent
  
} from "react-native";
import { SafeAreaView, ScrollView } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";

// For now...
import { fetchBook } from "../utils/books";

const reviews = [
  {
    id: 1,
    text: "Some text about how good the book was"
  },
  {
    id: 2,
    text: "Some text about how bad the book was"
  },
  {
    id: 3,
    text: "Irrelevant wordage about liking cheese"
  },
  {
    id: 4,
    text: "Rambling on about unrelated stuff"
  },
  {
    id: 5,
    text: "Blah, blah, cabbages"
  }
];

// Uses book state set in Results to display an individual book.

export default function Detail({ navigation, GlobalState }) {
  const { book } = GlobalState;
  

  return (
    <SafeAreaView style={styles.screen}>
      
      <ScrollView>
       

      <Header GlobalState={GlobalState} />
      <View style={styles.body}>
        <View style={styles.book}>
          <BookCard book={book} />
        </View>
      
          <Text>{book.description}</Text> 
          
          
      
        <View style={styles.reviews}>
         {reviews.map((item)=>{


          return(
            <View key={item.id}>
            <ReviewCard review={item}/>
            </View>
          )
          })}
        </View>
        
      </View>
      <Footer navigation={navigation}GlobalState={GlobalState} />
    </ScrollView>
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
      flex: 1,
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: '#14141405',
    marginTop: 140,
    marginBottom: 80,
   
   
  
  },
 
  reviews: {
    
    flex:1,
   },

});

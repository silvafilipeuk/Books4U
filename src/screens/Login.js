import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home({ navigation, GlobalState }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
      
  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <View style = {styles.screen}>
      <Header />
      <View style = {styles.body}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.subHeaderText}>Sign in to continue</Text>
        <Text>Username</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.username}
            onChangeText={(value) => handleChange('username', value)}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <Pressable style={styles.buttons}title="Log in"  onPress={handleSubmit}>
          <Text style={styles.text}>Log in</Text>
        </Pressable>
      </View>
      <Footer navigation = {navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:0,
  },
  headerText:{
    fontSize:38,
    fontWeight:'bold'
  },
  subHeaderText:{
    fontSize:18
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width:300,
    borderRadius:20,
    backgroundColor:'#d3d3d3'
  },
  buttons:{
    width:300,
    backgroundColor:'black',
    borderRadius:20,
    padding:12
  },
  text:{
    color:'white',
    fontSize:22,
    textAlign:'center'
  }
});
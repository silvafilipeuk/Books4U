import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  // Global state management.

  const [count, setCount] = useState(0);

  const GlobalState = {
    count, setCount
  };

  // Navigation.

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Login'>
        <Stack.Screen name = 'Login' options = {{ headerShown: false }}>
          { props => <Login {...props} GlobalState = {GlobalState} />}
        </Stack.Screen>
        <Stack.Screen name = 'Home' options = {{ headerShown: false }}>
          { props => <Home {...props} GlobalState = {GlobalState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React from 'react';
import Home from './components/Home';
import Clothes from './components/Clothes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Clothes" component={Clothes} />
        </Stack.Navigator>
      </NavigationContainer>
  )
  };

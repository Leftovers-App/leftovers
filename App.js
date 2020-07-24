import React from 'react';
import { Text, Button } from 'react-native';
import { Provider } from "react-redux";
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({ headerShown: false })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
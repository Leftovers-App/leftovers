import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import { Provider } from "react-redux";
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from "firebase";
import store from "./store";
import ApiKeys from "./constants/ApiKeys";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import HomeDrawer from "./components/HomeDrawer";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onAuthStateChanged = (user) => {
    setIsAuthenticated(!!user);
  }

  if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }
  firebase.auth().onAuthStateChanged(onAuthStateChanged)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({ route }) => ({ headerShown: false })}
        >
          {(!isAuthenticated) ?
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
              <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
            </>
            :
            <Stack.Screen name="Home Drawer" component={HomeDrawer} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
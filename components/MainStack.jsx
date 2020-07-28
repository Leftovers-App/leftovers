import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import ApiKeys from "../constants/ApiKeys";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import HomeDrawer from "../components/HomeDrawer";
import { setCurrentUser } from "../slices/authReducer";

const Stack = createStackNavigator();

export default function MainStack() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const dispatch = useDispatch();
    const { currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    const onAuthStateChanged = (user) => {
        setIsAuthenticated(!!user);
        setCurrentUser(user);
    }

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FireBaseConfig); }
    firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return (
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
    );
}
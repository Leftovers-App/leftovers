import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../services/FirebaseService";
import { signIn, signOut } from "../../slices/authReducer";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import HomeDrawer from "./HomeDrawer";

const Stack = createStackNavigator();

export default function MainStack() {
    const dispatch = useDispatch();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(signIn({ email: user['email'] }));
        }
        else {
            dispatch(signOut());
        }
    });

    const { isAuthenticated } = useSelector(
        (state) => state.auth
    );

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
import * as React from "react";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
const Drawer = createDrawerNavigator();

export default function HomeDrawer({ navigation, route }) {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}
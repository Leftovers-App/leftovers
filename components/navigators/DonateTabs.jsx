import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../../screens/HomeScreen";
import DonatedFoodScreen from "../../screens/donate/DonatedFoodScreen";

const Tab = createBottomTabNavigator();

export default function DonateTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Donated Food" component={DonatedFoodScreen} />
        </Tab.Navigator>
    );
}
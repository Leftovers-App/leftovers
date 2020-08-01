import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AvailableOffersScreen from "../../screens/receive/AvailableOffersScreen";
import ReceivedFoodScreen from "../../screens/receive/ReceivedFoodScreen";

const Tab = createBottomTabNavigator();

export default function ReceiveTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Availabe Offers" component={AvailableOffersScreen} />
            <Tab.Screen name="Received Food" component={ReceivedFoodScreen} />
        </Tab.Navigator>
    );
}
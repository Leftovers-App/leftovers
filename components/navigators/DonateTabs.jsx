import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewOfferScreen from "../../screens/donate/NewOfferScreen";
import DonatedFoodScreen from "../../screens/donate/DonatedFoodScreen";

const Tab = createBottomTabNavigator();

export default function DonateTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="New Offer" component={NewOfferScreen} />
            <Tab.Screen name="Donated Food" component={DonatedFoodScreen} />
        </Tab.Navigator>
    );
}
import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewOfferScreen from "../../screens/donate/NewOfferScreen";
import DonatedFoodScreen from "../../screens/donate/DonatedFoodScreen";
import PostDetailScreen from "../../screens/PostDetailScreen";
import ActiveDonationsScreen from "../../screens/donate/ActiveDonationsScreen";
import InnerStack from "./InnerStack";

const Tab = createBottomTabNavigator();

function actionStack() {
    const routes = {
        "New Offer": NewOfferScreen,
        "Active Donations": ActiveDonationsScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack screens={routes} />);
}

function allStack() {
    const routes = {
        "Donated Food": DonatedFoodScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack screens={routes} />);
}

export default function DonateTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Donate Action" component={actionStack} />
            <Tab.Screen name="All Donations" component={allStack} />
        </Tab.Navigator>
    );
}
import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from "react-redux";
import AvailableOffersScreen from "../../screens/receive/AvailableOffersScreen";
import ReceivedFoodScreen from "../../screens/receive/ReceivedFoodScreen";
import ActiveClaimsScreen from "../../screens/receive/ActiveClaimsScreen";
import PostDetailScreen from "../../screens/PostDetailScreen";
import InnerStack from "./InnerStack";

const Tab = createBottomTabNavigator();

function actionStack() {
    const { activeClaims } = useSelector((state) => state.foodReception);
    let initialActionRoute;
    if (activeClaims.length > 0) { initialActionRoute = "Active Claims" }
    else { initialActionRoute = "Available Offers" }

    const routes = {
        "Available Offers": AvailableOffersScreen,
        "Active Claims": ActiveClaimsScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack initialRoute={initialActionRoute} screens={routes} />);
}

function allStack() {
    const routes = {
        "Received Food": ReceivedFoodScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack initialRoute="Received Food" screens={routes} />);
}

export default function ReceiveTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Receive Action" component={actionStack} />
            <Tab.Screen name="All Claims" component={allStack} />
        </Tab.Navigator>
    );
}
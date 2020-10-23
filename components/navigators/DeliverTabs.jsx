import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodDeliveredScreen from "../../screens/deliver/FoodDeliveredScreen";
import JobAssignmentScreen from "../../screens/deliver/JobAssignmentScreen";
import CurrentJobScreen from "../../screens/deliver/CurrentJobScreen";
import PostDetailScreen from "../../screens/PostDetailScreen";
import InnerStack from "./InnerStack";

const Tab = createBottomTabNavigator();

function actionStack() {
    const routes = {
        "Job Assignment": JobAssignmentScreen,
        "Current Job": CurrentJobScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack initialRoute="Job Assignment" screens={routes} />);
}

function allStack() {
    const routes = {
        "Food Delivered": FoodDeliveredScreen,
        "Post Detail": PostDetailScreen
    }
    return (<InnerStack initialRoute="Food Delivered" screens={routes} />);
}

export default function DeliverTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Job Assignment" component={actionStack} />
            <Tab.Screen name="Food Delivered" component={allStack} />
        </Tab.Navigator>
    );
}
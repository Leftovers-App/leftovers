import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodDeliveredScreen from "../../screens/deliver/FoodDeliveredScreen";
import JobAssignmentScreen from "../../screens/deliver/JobAssignmentScreen";

const Tab = createBottomTabNavigator();

export default function DeliverTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Job Assignment" component={JobAssignmentScreen} />
            <Tab.Screen name="Food Delivered" component={FoodDeliveredScreen} />
        </Tab.Navigator>
    );
}
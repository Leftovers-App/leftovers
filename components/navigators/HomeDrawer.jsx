import * as React from "react";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DonateTabs from "./DonateTabs";
import ProfileScreen from "../../screens/ProfileScreen";
import ReceiveTabs from "./ReceiveTabs";
import DeliverTabs from "./DeliverTabs";

const Drawer = createDrawerNavigator();

export default function HomeDrawer({ navigation, route }) {
    return (
        <Drawer.Navigator initialRouteName="Donate">
            <Drawer.Screen name="Donate" component={DonateTabs} />
            <Drawer.Screen name="Receive" component={ReceiveTabs} />
            <Drawer.Screen name="Deliver" component={DeliverTabs} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}
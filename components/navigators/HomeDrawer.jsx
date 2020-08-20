import React, { useEffect } from "react";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import DonateTabs from "./DonateTabs";
import ProfileScreen from "../../screens/ProfileScreen";
import ReceiveTabs from "./ReceiveTabs";
import DeliverTabs from "./DeliverTabs";
import { fetchDeliveries } from "../../slices/foodDeliveryReducer";
import { fetchFoodDonations } from "../../slices/foodDonationReducer";
import { fetchReceivedFood } from "../../slices/foodReceptionReducer";

const Drawer = createDrawerNavigator();

export default function HomeDrawer({ navigation, route }) {
    const { email } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(fetchFoodDonations());
            dispatch(fetchReceivedFood());
            dispatch(fetchDeliveries());
        }
    }, []);

    return (
        <Drawer.Navigator initialRouteName="Donate">
            <Drawer.Screen name="Donate" component={DonateTabs} />
            <Drawer.Screen name="Receive" component={ReceiveTabs} />
            <Drawer.Screen name="Deliver" component={DeliverTabs} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}
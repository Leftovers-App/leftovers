import * as React from "react";
import { Text } from "react-native";

export const Welcome = (props) => {
    return (
        <Text>Welcome, {props.email}!</Text>
    );
};
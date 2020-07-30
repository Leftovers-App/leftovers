import * as React from "react";
import { Text } from "react-native";

export const Welcome = (props) => {
    return (
        <Text>{props.email}!</Text>
    );
};
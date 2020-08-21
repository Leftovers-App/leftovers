import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function InnerStack(props) {
    let screens = [];
    for (let screen in props.screens) {
        screens.push(<Stack.Screen name={screen} component={props.screens.screen} />)
    }

    return (
        <Stack.Navigator>
            {screens}
        </Stack.Navigator>
    );
}

import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function InnerStack(props) {
    let screens = [];
    for (let screen in props.screens) {
        screens.push(<Stack.Screen key={screen} name={screen} component={props.screens[screen]} />)
    }

    return (
        <Stack.Navigator screenOptions={({ route }) => ({ headerShown: false })}>
            {screens}
        </Stack.Navigator>
    );
}

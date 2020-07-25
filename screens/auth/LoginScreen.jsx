import * as React from "react";
import { Button, Platform, Text } from "react-native";
import styled from "styled-components/native";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

export default function LoginScreen({ navigation, route }) {
    return (
        <Container>
            <Text>Login Screen</Text>
            <Button title="Login" onPress={() => navigation.navigate("Home Drawer")} />
            <Button title="Go to Sign Up" onPress={() => navigation.navigate("Sign Up")} />
            <Button title="Go to Forgot Password" onPress={() => navigation.navigate("Forgot Password")} />
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
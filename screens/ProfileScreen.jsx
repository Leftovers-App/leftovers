import * as React from "react";
import { Button, Platform, Text } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { Welcome } from "../components/Welcome";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

export default function DetailsScreen({ navigation, route }) {
    const onLogoutPress = () => {
        firebase.auth().signOut();
    };

    return (
        <Container>
            <Welcome email={email} />
            <Button title="Logout" onPress={() => onLogoutPress()} />
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
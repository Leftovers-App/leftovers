import React, { useState } from "react";
import { Alert, Button, Platform, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

export default function ForgotPasswordScreen({ navigation, route }) {
    const [email, setEmail] = useState("");

    const onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
                navigation.goBack();
            }, (error) => {
                Alert.alert(error.message);
            });
    };

    return (
        <Container>
            <Text>Forgot Password Screen</Text>
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Email" style={{ width: 200, height: 40, borderWidth: 1 }} value={email} onChangeText={(text) => { setEmail(text) }} />
            <Button title="Reset Password" onPress={() => onResetPasswordPress()} />
            <Button title="Back to Login" onPress={() => navigation.goBack()} />
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
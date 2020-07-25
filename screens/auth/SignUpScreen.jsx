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

export default function SignUpScreen({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const onSignUpPress = () => {
        if (password !== passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Successfully signed up.")
            }, (error) => {
                Alert.alert(error.message);
            })
    }

    return (
        <Container>
            <Text>Sign Up Screen</Text>
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Email" style={{ width: 200, height: 40, borderWidth: 1 }} value={email} onChangeText={(text) => { setEmail(text) }} />
            <TextInput autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" style={{ width: 200, height: 40, borderWidth: 1 }} value={password} onChangeText={(text) => { setPassword(text) }} />
            <TextInput autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Confirm Password" style={{ width: 200, height: 40, borderWidth: 1 }} value={passwordConfirm} onChangeText={(text) => { setPasswordConfirm(text) }} />
            <Button title="Sign Up" onPress={() => onSignUpPress()} />
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
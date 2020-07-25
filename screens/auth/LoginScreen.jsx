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

export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Successfully logged in.');
            }, (error) => {
                Alert.alert(error.message);
            });
    };

    return (
        <Container>
            <Text>Login Screen</Text>
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Email" style={{ width: 200, height: 40, borderWidth: 1 }} value={email} onChangeText={(text) => { setEmail(text) }} />
            <TextInput autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" style={{ width: 200, height: 40, borderWidth: 1 }} value={password} onChangeText={(text) => { setPassword(text) }} />
            <Button title="Login" onPress={() => onLoginPress()} />
            <Button title="Create Account..." onPress={() => navigation.navigate("Sign Up")} />
            <Button title="Forgot Password...." onPress={() => navigation.navigate("Forgot Password")} />
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
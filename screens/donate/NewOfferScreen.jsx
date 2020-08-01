import React, { useState } from "react";
import { Button, Dimensions, Platform, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function DonatedFoodScreen({ navigation, route }) {
    const { email } = useSelector(
        (state: RootState) => state.auth
    );
    const [newPostDesc, setNewPostDesc] = useState("");

    const db = firebase.firestore();
    const postsRef = db.collection('posts');

    const createPost = () => {
        postsRef.add({
            description: newPostDesc,
            foodDonor: email
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setNewPostDesc("");
            navigation.navigate("Donated Food")
        }).catch((error) => {
            console.error("Error adding document: ", error);
            Alert.alert(error.message);
        });
    };

    return (
        <Container>
            <Text>Offer some food!</Text>
            <TextInput placeholder="Post Description" style={{ width: screenWidth * .8, height: 40, borderWidth: 1 }} value={newPostDesc} onChangeText={(text) => { setNewPostDesc(text) }} />
            <Button title="Create Post" onPress={() => createPost()} />
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;
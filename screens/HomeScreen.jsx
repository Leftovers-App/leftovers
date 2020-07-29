import React, { useState, useEffect } from "react";
import { Button, Platform, Text } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { Welcome } from "../components/Welcome";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

export default function HomeScreen({ navigation, route }) {
    const { email } = useSelector(
        (state: RootState) => state.auth
    );
    const [desc, setDesc] = useState("");
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        // Load Posts
        if (email) {
            const db = firebase.firestore();
            const postsRef = db.collection('posts');
            const postsQuery = postsRef.where('foodDonor', '==', email);
            postsQuery.get()
                .then(posts => {
                    let tempPosts = [];
                    posts.forEach(doc => {
                        tempPosts.push(<Text key={doc.data().id} >{doc.data().description}</Text>)
                    })
                    setMyPosts(tempPosts);
                });
        }
        else {
            setMyPosts([<Text>No posts available!</Text>]);
        }
    });

    const onLogoutPress = () => {
        firebase.auth().signOut();
    };

    console.log(myPosts);

    return (
        <Container>
            <Welcome email={email} />
            <Text>Here are your posts:</Text>
            {myPosts}
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
            <Button title="Logout" onPress={() => onLogoutPress()} />
        </Container>
    );
}


const Container = styled.SafeAreaView`
    flex: 1;
    backgroundColor: #fff;
    alignItems: center;
    justifyContent: space-evenly;
`;
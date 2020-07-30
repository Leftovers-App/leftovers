import React, { useState, useEffect } from "react";
import { Button, Dimensions, Platform, ScrollView, Text, View } from "react-native";
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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function HomeScreen({ navigation, route }) {
    const { email } = useSelector(
        (state: RootState) => state.auth
    );
    const [myPosts, setMyPosts] = useState([]);

    const loadPosts = () => {
        if (email) {
            const db = firebase.firestore();
            const postsRef = db.collection('posts');
            const postsQuery = postsRef.where('foodDonor', '==', email);
            postsQuery.get()
                .then(posts => {
                    let tempPosts = [];
                    posts.forEach(doc => {
                        console.log(doc)
                        tempPosts.push(<Text key={doc.id} style={{ marginBottom: 25 }}>{doc.data().description}</Text>)
                    })
                    setMyPosts(tempPosts);
                });
        }
        else {
            setMyPosts([<Text>No posts available!</Text>]);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const onLogoutPress = () => {
        firebase.auth().signOut();
    };

    return (
        <Container>
            <Welcome email={email} />
            <Text>Here are your posts:</Text>
            <View style={{ height: screenHeight * .3 }}>
                <ScrollView>
                    {myPosts}
                </ScrollView>
            </View>
            <Button title="Reload Posts" onPress={() => loadPosts()} />
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
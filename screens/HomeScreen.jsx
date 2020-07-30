import React, { useState, useEffect } from "react";
import { Alert, Button, Dimensions, Platform, ScrollView, Text, TextInput, View } from "react-native";
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
    const [newPostDesc, setNewPostDesc] = useState([]);

    const db = firebase.firestore();
    const postsRef = db.collection('posts');

    const loadPosts = () => {
        if (email) {
            const postsQuery = postsRef.where('foodDonor', '==', email);
            postsQuery.get()
                .then(posts => {
                    let tempPosts = [];
                    posts.forEach(doc => {
                        tempPosts.push(<Text key={doc.id} style={{ marginBottom: 25 }}>{doc.data().description}</Text>)
                    })
                    setMyPosts(tempPosts);
                });
        }
        else {
            setMyPosts([<Text>No posts available!</Text>]);
        }
    };

    const createPost = () => {
        postsRef.add({
            description: newPostDesc,
            foodDonor: email
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setNewPostDesc("");
            loadPosts();
        }).catch((error) => {
            console.error("Error adding document: ", error);
            Alert.alert(error.message);
        });
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const onLogoutPress = () => {
        firebase.auth().signOut();
    };

    return (
        <Container>
            <View style={{ width: screenWidth * .8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Welcome email={email} />
                <Button title="Logout" onPress={() => onLogoutPress()} />
            </View>
            <View style={{ width: screenWidth * .8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Here are your posts:</Text>
                <Button title="Reload Posts" onPress={() => loadPosts()} />
            </View>
            <View style={{ height: screenHeight * .2 }}>
                <ScrollView>
                    {myPosts}
                </ScrollView>
            </View>
            <TextInput placeholder="Post Description" style={{ width: 200, height: 40, borderWidth: 1 }} value={newPostDesc} onChangeText={(text) => { setNewPostDesc(text) }} />
            <Button title="Create Post" onPress={() => createPost()} />
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        </Container>
    );
}


const Container = styled.SafeAreaView`
    flex: 1;
    backgroundColor: #fff;
    alignItems: center;
    justifyContent: space-evenly;
`;
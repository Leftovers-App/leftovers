import React, { useState, useEffect } from "react";
import { Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { CircleXIcon } from "../../components/Icons";

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
    const [myPosts, setMyPosts] = useState([]);

    const db = firebase.firestore();
    const postsRef = db.collection('posts');

    const loadPosts = () => {
        if (email) {
            const postsQuery = postsRef.where('foodDonor', '==', email);
            postsQuery.get()
                .then(posts => {
                    let tempPosts = [];
                    posts.forEach(doc => {
                        tempPosts.push(
                            <SBRow key={doc.id} style={{ marginBottom: 25 }}>
                                <Text>{doc.data().description}</Text>
                                <TouchableOpacity onPress={() => { deletePost(doc.id) }}><CircleXIcon /></TouchableOpacity>
                            </SBRow>
                        )
                    })
                    setMyPosts(tempPosts);
                });
        }
        else {
            setMyPosts([<Text>No posts available!</Text>]);
        }
    };

    const deletePost = (postId) => {
        postsRef.doc(postId).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                loadPosts();
            })
            .catch((error) => {
                console.error("Error removing document");
                Alert.alert(error.message);
            });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <Container>
            <SBRow>
                <Text>Here are your posts:</Text>
                <Button title="Reload Posts" onPress={() => loadPosts()} />
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {myPosts}
                </ScrollView>
            </View>
        </Container>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: #fff;
  alignItems: center;
  justifyContent: space-evenly;
`;

const SBRow = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: ${screenWidth * .8}px;
`;
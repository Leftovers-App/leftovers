import React, { useState, useEffect } from "react";
import { Button, Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { fetchFoodDonations } from "../../slices/postReducer";
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
        (state) => state.auth
    );
    const { foodDonations, foodDonationsStatus, foodDonationsError } = useSelector(
        (state) => state.post
    );
    const dispatch = useDispatch();

    const formatPosts = (posts) => {
        let formattedPosts = [];
        posts.forEach(doc => {
            formattedPosts.push(
                <SBRow key={doc.id} style={{ marginBottom: 25 }}>
                    <Text>{doc.data.description}</Text>
                    <TouchableOpacity onPress={() => { deletePost(doc.id) }}><CircleXIcon /></TouchableOpacity>
                </SBRow>
            )
        })
        return formattedPosts;
    }

    const deletePost = (postId) => {
        // postsRef.doc(postId).delete()
        //     .then(() => {
        //         console.log("Document successfully deleted!");
        //         loadPosts();
        //     })
        //     .catch((error) => {
        //         console.error("Error removing document");
        //         Alert.alert(error.message);
        //     });
        console.log('called deletePost for item' + postId);
    }

    useEffect(() => {
        if (email) {
            dispatch(fetchFoodDonations(email));
        }
    }, []);

    return (
        <Container>
            <SBRow>
                <Text>Here are your posts:</Text>
                <Button title="Reload Posts" onPress={() => { dispatch(fetchFoodDonations(email)); }} />
            </SBRow>
            <View style={{ height: screenHeight * .5 }}>
                <ScrollView>
                    {(foodDonationsError) ?
                        <Text style={{ color: 'red' }}>{foodDonationsError}</Text>
                        : (foodDonationsStatus === 'loading') ?
                            <Text>Loading posts...</Text>
                            : (foodDonations.length > 0) ?
                                <>
                                    {formatPosts(foodDonations)}
                                </>
                                :
                                <Text>No posts available!</Text>
                    }
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
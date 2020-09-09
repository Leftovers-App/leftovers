import React, { useEffect, useState } from "react";
import { Button, Dimensions, Platform, Text } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { AcceptJobButton, CancelClaimButton, CancelJobButton, CancelOfferButton, ClaimOfferButton, ConfirmDeliveryButton, ConfirmPickupButton, DenyJobButton } from "../components/PostActionButtons";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function PostDetailScreen({ navigation, route }) {
    const { initialPost, role } = route.params;
    // const [postActions, setPostActions] = useState([]);
    let post = null;

    // Handle post that does not have a valid initialPost
    useEffect(() => {
        if (!initialPost) {
            console.log("Initial post not defined at PostDetail. Navigating back.");
            navigation.goBack();
        }
    }, [])

    // Select post from Redux state
    let postActions = [];
    switch (role) {
        case "donate":
            console.log("donate post detail")
            // if (post.data.status === "available") {
            //     newPostActions.push(CancelOfferButton);
            // }
            // else if (post.data.status === "assigned") {
            //     newPostActions.push(ConfirmPickupButton);
            // }
            // setPostActions(newPostActions);
            break;
        case "receive":
            console.log("receive post detail")
            const { receiveDetailPost } = useSelector((state) => state.foodReception);
            post = receiveDetailPost;
            if (post) {
                if (post.data.status === "available") { postActions.push(ClaimOfferButton(post.id)); }
                else {
                    if (post.data.status === "claimed") { postActions.push(CancelClaimButton); }
                    else if (post.data.status === "picked up") { postActions.push(ConfirmDeliveryButton); }
                }
                // setPostActions(newPostActions);
            } else { navigation.goBack(); }
            break;
        case "deliver":
            console.log("deliver post detail")
            // if (post.data.status === "pending assignment") {
            //     newPostActions.push(AcceptJobButton);
            //     newPostActions.push(DenyJobButton);
            // }
            // else { if (post.data.status === "assigned") { newPostActions.push(CancelJobButton); } }
            // setPostActions(newPostActions);
            break;
        default:
            console.log("No valid role. Exiting post detail.")
            navigation.goBack();
    }

    if (!post) {
        console.log("Post not defined at PostDetail. Navigating back.");
        navigation.goBack();
    }

    // Make actions available based on role and post status
    // useEffect(() => {
    //     if (post) {
    //         let newPostActions = [];
    //         switch (role) {
    //             case "donate":
    //                 if (post.data.status === "available") {
    //                     newPostActions.push(CancelOfferButton);
    //                 }
    //                 else if (post.data.status === "assigned") {
    //                     newPostActions.push(ConfirmPickupButton);
    //                 }
    //                 setPostActions(newPostActions);
    //                 break;
    //             case "receive":
    //                 if (post.data.status === "available") { newPostActions.push(ClaimOfferButton(post.id)); }
    //                 else {
    //                     if (post.data.status === "claimed") { newPostActions.push(CancelClaimButton); }
    //                     else if (post.data.status === "picked up") { newPostActions.push(ConfirmDeliveryButton); }
    //                 }
    //                 setPostActions(newPostActions);
    //                 break;
    //             case "deliver":
    //                 if (post.data.status === "pending assignment") {
    //                     newPostActions.push(AcceptJobButton);
    //                     newPostActions.push(DenyJobButton);
    //                 }
    //                 else { if (post.data.status === "assigned") { newPostActions.push(CancelJobButton); } }
    //                 setPostActions(newPostActions);
    //                 break;
    //             default:
    //                 console.log("Role invalid in post detail.");
    //         }
    //     } else { console.log("No valid post."); }
    // }, [post])

    return (
        <Container>
            {(post) ?
                <>
                    <Text>Post Detail for: {post.data.description}!</Text>
                    <Text>Actions:</Text>
                    <SBRow>
                        {postActions}
                    </SBRow>
                </>
                :
                <Text>No post available!</Text>
            }
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

const SBRow = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: ${screenWidth * .8}px;
`;
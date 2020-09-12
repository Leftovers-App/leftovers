import React, { useEffect, useState } from "react";
import { Button, Dimensions, Platform, Text } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { resetReceiveDetailPost } from "../slices/foodReceptionReducer";
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
    const { role } = route.params;
    // const [post, setPost] = useState(null);
    const dispatch = useDispatch();

    /*
        TODO: pass in post ID as a prop to this component; try setting a snapshot listener for that post, catch errors => navigate back;
        remove all of the redux stuff with detailPost, etc.
    */

    // useEffect(() => {
    //     return () => {
    //         dispatch(resetReceiveDetailPost());
    //     }
    // }, [])

    // Select post from Redux state
    let detailPost = null;
    let setDetailPostStatus = "not ready";
    switch (role) {
        case "donate":
            console.log("donate post detail");
            break;
        case "receive":
            console.log("receive post detail")
            const { detailPost, setDetailPostStatus } = useSelector((state) => state.foodReception);
            // setPost(receiveDetailPost);
            break;
        case "deliver":
            console.log("deliver post detail")
            break;
        default:
            console.log("No valid role. No post has been selected.")
            navigation.goBack();
    }

    const getPostActions = (status, role) => {
        if (detailPost) {
            let postActions = [];
            switch (role) {
                case "donate":
                    if (status === "available") { postActions.push(CancelOfferButton); }
                    else if (status === "assigned") { postActions.push(ConfirmPickupButton); }
                    break;
                case "receive":
                    if (status === "available") { postActions.push(ClaimOfferButton(post.id)); }
                    else {
                        if (status === "claimed") { postActions.push(CancelClaimButton); }
                        else if (status === "picked up") { postActions.push(ConfirmDeliveryButton); }
                    }
                    break;
                case "deliver":
                    if (status === "pending assignment") {
                        postActions.push(AcceptJobButton);
                        postActions.push(DenyJobButton);
                    }
                    else { if (status === "assigned") { postActions.push(CancelJobButton); } }
                    break;
                default:
                    console.log("No valid role. Exiting post detail.")
                    navigation.goBack();
            }
            return postActions;
        }
        else {
            console.log("No post present. Exiting post detail.");
            navigation.goBack();
        }
    }

    return (
        <Container>
            {(setDetailPostStatus === "not ready") ?
                <Text>Post not ready yet</Text>
                : (detailPost) ?
                    <>
                        <Text>Post Detail for: {post.data.description}!</Text>
                        <Text>Actions:</Text>
                        <SBRow>
                            {getPostActions(detailPost.data.status, role)}
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
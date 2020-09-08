import React, { useState } from "react";
import { Button, Dimensions, Platform, Text } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { AcceptJobButton, CancelClaimButton, CancelJobButton, CancelOfferButton, ClaimOfferButton, ConfirmDeliveryButton, ConfirmPickupButton, DenyJobButton } from "../components/PostActionButtons";
import { acceptJob } from "../services/FirebaseService";

let safeMargin;

if (Platform.OS == "ios") {
    safeMargin = 65;
} else if ((Platform.OS = "android")) {
    safeMargin = 0;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function PostDetailScreen({ navigation, route }) {
    // TODO: on initial load of this screen, useSelector the post you're trying to view from the appropriate role's snapshotted
    // list, based on post ID passed into this screen as a prop, such that post status stays accurate/current.
    // Add a useEffect to handle case where post returns null from useSelector (post no longer in snapshotted list due to cancel action, etc.),
    // then navigation.goBack()
    const { postId, role } = route.params;
    const { postActions, setPostActions } = useState([]);
    let post = null;

    useEffect(() => {
        let newPostActions = [];
        if (role === "donate") {
            const { foodDonations } = useSelector((state) => state.foodDonation);
            post = foodDonations.find(donation => donation.id === postId);

            if (post.data.status === "available") {
                newPostActions.push(CancelOfferButton);
            }
            else if (post.data.status === "assigned") {
                newPostActions.push(ConfirmPickupButton);
            }
        }
        else if (role === "receive") {
            if (post.data.status === "available") {
                const { availableOffers } = useSelector((state) => state.foodReception);
                post = availableOffers.find(offer => offer.id === postId);

                newPostActions.push(ClaimOfferButton);
            }
            else {
                const { receivedFood } = useSelector((state) => state.foodReception);
                post = receivedFood.find(claim => claim.id === postId);

                if (post.data.status === "claimed") {
                    newPostActions.push(CancelClaimButton);
                }
                else if (post.data.status === "picked up") {
                    newPostActions.push(ConfirmDeliveryButton);
                }
            }
        }
        else if (role === "deliver") {
            if (post.data.status === "pending assignment") {
                const { availableJobs } = useSelector((state) => state.foodDelivery);
                post = availableJobs.find(offer => offer.id === postId);

                newPostActions.push(AcceptJobButton);
                newPostActions.push(DenyJobButton);
            }
            else {
                const { deliveries } = useSelector((state) => state.foodDelivery);
                post = deliveries.find(offer => offer.id === postId);

                if (post.data.status === "assigned") { newPostActions.push(CancelJobButton); }
            }
        }
        setPostActions(newPostActions);
        if (!post) {
            console.log("Post not defined at PostDetail. Navigating back.");
            navigation.goBack();
        }
    }, [post, role])


    return (
        <Container>
            <Text>Post Detail for: {post.data.description}!</Text>
            <Text>Actions:</Text>
            <SBRow>
                {postActions}
            </SBRow>
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
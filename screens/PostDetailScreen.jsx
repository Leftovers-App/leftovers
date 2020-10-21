import React, { useEffect, useState } from "react";
import { Button, Dimensions, Platform, Text } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { postsRef } from "../services/FirebaseService";
import { convertTimestamps } from "../services/TimestampUtil";
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
    const { postId, role } = route.params;

    // Get all relevant Redux states to pass as props to button components
    const { cancelJobStatus, seenJobs, currentJob, pendingJob } = useSelector(
        (state) => state.foodDelivery
    );
    const { confirmPickupErrors, confirmPickupStatuses, deleteFoodDonationErrors, deleteFoodDonationStatuses } = useSelector(
        (state) => state.foodDonation
    );
    const { cancelClaimErrors, cancelClaimStatuses, claimOfferErrors, claimOfferStatuses, confirmDeliveryErrors, confirmDeliveryStatuses } = useSelector(
        (state) => state.foodReception
    );
    const dispatch = useDispatch();

    // States local to PostDetailScreen
    const [detailPost, setDetailPost] = useState(null);
    const [getDetailPostStatus, setGetDetailPostStatus] = useState("idle");

    // On load, set snapshot listener for detailPost
    useEffect(() => {
        try {
            console.log("Post ID param:", postId)
            setGetDetailPostStatus("loading");
            postsRef.doc(postId)
                .onSnapshot((post) => {
                    console.log("inside snapshot listener!")
                    setDetailPost({
                        id: post.id,
                        data: convertTimestamps(post.data())
                    });
                    setGetDetailPostStatus("complete");
                    console.log(detailPost);
                });
        } catch (err) {
            setGetDetailPostStatus("failed");
            console.error(err.toString());
            navigation.goBack();
        }
    }, [])

    // Get post actions based on role and status
    const getPostActions = (detailPost, role) => {
        if (detailPost) {
            const status = detailPost.data.status;
            let postActions = [];
            switch (role) {
                case "donate":
                    if (status === "available") { postActions.push(CancelOfferButton(detailPost.id, dispatch, deleteFoodDonationErrors, deleteFoodDonationStatuses)); }
                    else if (status === "assigned") { postActions.push(ConfirmPickupButton(detailPost.id, dispatch, confirmPickupErrors, confirmPickupStatuses)); }
                    break;
                case "receive":
                    if (status === "available") { postActions.push(ClaimOfferButton(detailPost.id, dispatch, claimOfferErrors, claimOfferStatuses)); }
                    else {
                        if (status === "claimed") { postActions.push(CancelClaimButton(detailPost.id, dispatch, cancelClaimErrors, cancelClaimStatuses)); }
                        else if (status === "picked up") { postActions.push(ConfirmDeliveryButton(detailPost.id, dispatch, confirmDeliveryErrors, confirmDeliveryStatuses)); }
                    }
                    break;
                case "deliver":
                    if (status === "pending assignment") {
                        postActions.push(AcceptJobButton(detailPost.id));
                        postActions.push(DenyJobButton(detailPost.id));
                    }
                    else { if (status === "assigned") { postActions.push(CancelJobButton(detailPost.id, dispatch, cancelJobStatus, seenJobs, currentJob, pendingJob)); } }
                    break;
                default:
                    console.log("No valid role. Exiting post detail.")
                    navigation.goBack();
            }
            console.log("Post Actions:", postActions);
            return postActions;
        }
        else {
            console.log("No post present. Exiting post detail.");
            navigation.goBack();
        }
    }

    return (
        <Container>
            { (getDetailPostStatus == "complete") ?
                <>
                    <Text>Post Detail for: {detailPost.data.description}!</Text>
                    <Text>Actions:</Text>
                    <SBRow>
                        <>
                            {getPostActions(detailPost, role)}
                        </>
                    </SBRow>
                </>
                : (getDetailPostStatus == "loading") ?
                    < Text >Loading...</Text>
                    :
                    <Text>No post available: {getDetailPostStatus}</Text>
            }
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </Container >
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
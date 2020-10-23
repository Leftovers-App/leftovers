import * as React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { cancelJob, performJobAction } from "../slices/foodDeliveryReducer";
import { cancelFoodDonation, confirmPickup } from "../slices/foodDonationReducer";
import { cancelClaim, claimOffer, confirmDelivery } from "../slices/foodReceptionReducer";
import { CheckIcon, CheckSquareIcon, CircleCheckIcon, CircleXIcon } from "./Icons";

export const AcceptJobButton = (postId, dispatch) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                <Button title="ACCEPT" onPress={() => dispatch(performJobAction(true))} />
                <ButtonName>Accept Job</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const CancelClaimButton = (postId, dispatch, cancelClaimErrors, cancelClaimStatuses) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                {(cancelClaimErrors[postId]) ?
                    <Text style={{ color: 'red' }}>Failed</Text>
                    : (cancelClaimStatuses[postId] === 'loading') ?
                        <Text>Loading</Text>
                        : <TouchableOpacity onPress={() => { dispatch(cancelClaim(postId)); }}><CircleXIcon /></TouchableOpacity>
                }
                <ButtonName>Cancel Claim</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const CancelJobButton = (postId, dispatch, cancelJobStatus, seenJobs, currentJob, pendingJob) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                {(cancelJobStatus === "loading") ?
                    <Text>Canceling job...</Text>
                    :
                    <Button title="Cancel Job" onPress={() => dispatch(cancelJob(postId, seenJobs, currentJob, pendingJob))} />
                }
                <ButtonName>Cancel Job</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const CancelOfferButton = (postId, dispatch, deleteFoodDonationErrors, deleteFoodDonationStatuses) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                {(deleteFoodDonationErrors[postId]) ?
                    <Text style={{ color: 'red' }}>Failed</Text>
                    : (deleteFoodDonationStatuses[postId] === 'loading') ?
                        <Text>Loading</Text>
                        :
                        <TouchableOpacity onPress={() => { dispatch(cancelFoodDonation(postId)); }}><CircleXIcon /></TouchableOpacity>
                }
                <ButtonName>Cancel Offer</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const ClaimOfferButton = (postId, dispatch, claimOfferErrors, claimOfferStatuses) => {

    return (
        <React.Fragment key={postId}>
            <Container>
                {(claimOfferErrors[postId]) ?
                    <Text style={{ color: 'red' }}>Failed</Text>
                    : (claimOfferStatuses[postId] === 'loading') ?
                        <Text>Loading</Text>
                        :
                        <TouchableOpacity onPress={() => { dispatch(claimOffer(postId)); }}><CircleCheckIcon /></TouchableOpacity>
                }
                <ButtonName>Claim Offer</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const ConfirmDeliveryButton = (postId, dispatch, confirmDeliveryErrors, confirmDeliveryStatuses) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                {(confirmDeliveryErrors[postId]) ?
                    <Text style={{ color: 'red' }}>Failed</Text>
                    : (confirmDeliveryStatuses[postId] === 'loading') ?
                        <Text>Loading</Text>
                        :
                        <TouchableOpacity onPress={() => { dispatch(confirmDelivery(postId)); }}><CheckSquareIcon /></TouchableOpacity>
                }
                <ButtonName>Confirm Delivery</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const ConfirmPickupButton = (postId, dispatch, confirmPickupErrors, confirmPickupStatuses) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                {(confirmPickupErrors[postId]) ?
                    <Text style={{ color: 'red' }}>Failed</Text>
                    : (confirmPickupStatuses[postId] === 'loading') ?
                        <Text>Loading</Text>
                        :
                        <TouchableOpacity onPress={() => { dispatch(confirmPickup(postId)); }}><CheckIcon /></TouchableOpacity>
                }
                <ButtonName>Confirm Pickup</ButtonName>
            </Container>
        </React.Fragment>
    );
}

export const DenyJobButton = (postId, dispatch) => {
    return (
        <React.Fragment key={postId}>
            <Container>
                <Button title="DECLINE" onPress={() => dispatch(performJobAction(false))} />
                <ButtonName>Decline Job</ButtonName>
            </Container>
        </React.Fragment>
    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  alignItems: center;
  justifyContent: space-evenly;
`;

const ButtonName = styled.Text`
  paddingTop: 10px;
`;
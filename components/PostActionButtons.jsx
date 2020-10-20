import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { claimOffer } from "../slices/foodReceptionReducer";
import { CircleCheckIcon } from "./Icons";

export const AcceptJobButton = (postId) => {
    return (
        <Text key={postId}>Accept Job</Text>
    );
}

export const CancelClaimButton = (postId) => {
    return (
        <Text key={postId}>Cancel Claim</Text>
    );
}

export const CancelJobButton = (postId) => {
    return (
        <Text key={postId}>Cancel Job</Text>
    );
}

export const CancelOfferButton = (postId) => {
    return (
        <Text key={postId}>Cancel Offer</Text>
    );
}

export const ClaimOfferButton = (postId) => {
    const { claimOfferErrors, claimOfferStatuses } = useSelector(
        (state) => state.foodReception
    );
    const dispatch = useDispatch();

    return (
        <React.Fragment key={postId}>
            {(claimOfferErrors[postId]) ?
                <Text style={{ color: 'red' }}>Failed</Text>
                : (claimOfferStatuses[postId] === 'loading') ?
                    <Text>Loading</Text>
                    :
                    <TouchableOpacity onPress={() => { dispatch(claimOffer(postId)); }}><CircleCheckIcon /></TouchableOpacity>
            }
        </React.Fragment>
    );
}

export const ConfirmDeliveryButton = (postId) => {
    return (
        <Text key={postId}>Confirm Delivery</Text>
    );
}

export const ConfirmPickupButton = (postId) => {
    return (
        <Text key={postId}>Confirm Pickup</Text>
    );
}

export const DenyJobButton = (postId) => {
    return (
        <Text key={postId}>Deny Job</Text>
    );
}
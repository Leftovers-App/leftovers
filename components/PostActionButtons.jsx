import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { claimOffer } from "../slices/foodReceptionReducer";
import { CircleCheckIcon } from "./Icons";

export const AcceptJobButton = () => {
    return (
        <Text>Accept Job</Text>
    );
}

export const CancelClaimButton = () => {
    return (
        <Text>Cancel Claim</Text>
    );
}

export const CancelJobButton = () => {
    return (
        <Text>Cancel Job</Text>
    );
}

export const CancelOfferButton = () => {
    return (
        <Text>Cancel Offer</Text>
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

export const ConfirmDeliveryButton = () => {
    return (
        <Text>Confirm Delivery</Text>
    );
}

export const ConfirmPickupButton = () => {
    return (
        <Text>Confirm Pickup</Text>
    );
}

export const DenyJobButton = () => {
    return (
        <Text>Deny Job</Text>
    );
}
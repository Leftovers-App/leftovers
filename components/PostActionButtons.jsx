import * as React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { cancelJob, performJobAction } from "../slices/foodDeliveryReducer";
import { cancelFoodDonation, confirmPickup } from "../slices/foodDonationReducer";
import { cancelClaim, claimOffer, confirmDelivery } from "../slices/foodReceptionReducer";
import { CheckIcon, CheckSquareIcon, CircleCheckIcon, CircleXIcon } from "./Icons";

export const AcceptJobButton = (postId, dispatch) => {
    return (
        <React.Fragment key={postId}>
            <Button title="Accept Job" onPress={() => dispatch(performJobAction(true))} />
        </React.Fragment>
    );
}

export const CancelClaimButton = (postId, dispatch, cancelClaimErrors, cancelClaimStatuses) => {
    return (
        <React.Fragment key={postId}>
            {(cancelClaimErrors[postId]) ?
                <Text style={{ color: 'red' }}>Failed</Text>
                : (cancelClaimStatuses[postId] === 'loading') ?
                    <Text>Loading</Text>
                    : <TouchableOpacity onPress={() => { dispatch(cancelClaim(postId)); }}><CircleXIcon /></TouchableOpacity>
            }
        </React.Fragment>
    );
}

export const CancelJobButton = (postId, dispatch, cancelJobStatus, seenJobs, currentJob, pendingJob) => {
    return (
        <React.Fragment key={postId}>
            {(cancelJobStatus === "loading") ?
                <Text>Canceling job...</Text>
                :
                <Button title="Cancel Job" onPress={() => dispatch(cancelJob(postId, seenJobs, currentJob, pendingJob))} />
            }
        </React.Fragment>
    );
}

export const CancelOfferButton = (postId, dispatch, deleteFoodDonationErrors, deleteFoodDonationStatuses) => {
    return (
        <React.Fragment key={postId}>
            {(deleteFoodDonationErrors[postId]) ?
                <Text style={{ color: 'red' }}>Failed</Text>
                : (deleteFoodDonationStatuses[postId] === 'loading') ?
                    <Text>Loading</Text>
                    :
                    <TouchableOpacity onPress={() => { dispatch(cancelFoodDonation(postId)); }}><CircleXIcon /></TouchableOpacity>
            }
        </React.Fragment>
    );
}

export const ClaimOfferButton = (postId, dispatch, claimOfferErrors, claimOfferStatuses) => {

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

export const ConfirmDeliveryButton = (postId, dispatch, confirmDeliveryErrors, confirmDeliveryStatuses) => {
    return (
        <React.Fragment key={postId}>
            {(confirmDeliveryErrors[postId]) ?
                <Text style={{ color: 'red' }}>Failed</Text>
                : (confirmDeliveryStatuses[postId] === 'loading') ?
                    <Text>Loading</Text>
                    :
                    <TouchableOpacity onPress={() => { dispatch(confirmDelivery(postId)); }}><CheckSquareIcon /></TouchableOpacity>
            }
        </React.Fragment>
    );
}

export const ConfirmPickupButton = (postId, dispatch, confirmPickupErrors, confirmPickupStatuses) => {
    return (
        <React.Fragment key={postId}>
            {(confirmPickupErrors[postId]) ?
                <Text style={{ color: 'red' }}>Failed</Text>
                : (confirmPickupStatuses[postId] === 'loading') ?
                    <Text>Loading</Text>
                    :
                    <TouchableOpacity onPress={() => { dispatch(confirmPickup(postId)); }}><CheckIcon /></TouchableOpacity>
            }
        </React.Fragment>
    );
}

export const DenyJobButton = (postId, dispatch) => {
    return (
        <React.Fragment key={postId}>
            <Button title="Decline Job" onPress={() => dispatch(performJobAction(false))} />
        </React.Fragment>
    );
}
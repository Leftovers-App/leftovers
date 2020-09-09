import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { getAvailableOffers, postsRef, removeRecipient, setRecipient, setStatusDelivered } from "../services/FirebaseService";
import { convertTimestamps } from "../services/TimestampUtil";

let initialState = {
    activeClaims: [],
    availableOffers: [],
    cancelClaimErrors: {},
    cancelClaimStatuses: {},
    confirmDeliveryErrors: {},
    confirmDeliveryStatuses: {},
    claimOfferErrors: {},
    claimOfferStatuses: {},
    getAvailableOffersError: null,
    getAvailableOffersStatus: "idle",
    getReceivedFoodError: null,
    getReceivedFoodStatus: "idle",
    receivedFood: [],
    receiveDetailPost: null
};

const foodReceptionSlice = createSlice({
    name: "foodReception",
    initialState,
    reducers: {
        cancelClaimStarted(state, action) {
            state.cancelClaimErrors[action.payload] = null;
            state.cancelClaimStatuses[action.payload] = 'loading';
        },
        cancelClaimSuccess(state, action) {
            state.cancelClaimStatuses[action.payload] = 'idle';
        },
        cancelClaimFailed(state, action) {
            state.cancelClaimErrors[action.payload.id] = action.payload.error;
            state.cancelClaimStatuses[action.payload.id] = 'idle';
        },
        claimOfferStarted(state, action) {
            state.claimOfferErrors[action.payload] = null;
            state.claimOfferStatuses[action.payload] = 'loading';
        },
        claimOfferSuccess(state, action) {
            state.claimOfferStatuses[action.payload] = 'idle';
        },
        claimOfferFailed(state, action) {
            state.claimOfferErrors[action.payload.id] = action.payload.error;
            state.claimOfferStatuses[action.payload.id] = 'idle';
        },
        confirmDeliveryStarted(state, action) {
            state.confirmDeliveryErrors[action.payload] = null;
            state.confirmDeliveryStatuses[action.payload] = 'loading';
        },
        confirmDeliverySuccess(state, action) {
            state.confirmDeliveryStatuses[action.payload] = 'idle';
        },
        confirmDeliveryFailed(state, action) {
            state.confirmDeliveryErrors[action.payload.id] = action.payload.error;
            state.confirmDeliveryStatuses[action.payload.id] = 'idle';
        },
        getAvailableOffersStarted(state) {
            state.getAvailableOffersError = null;
            state.getAvailableOffersStatus = 'loading';
        },
        getAvailableOffersSuccess(state, action) {
            state.availableOffers = action.payload;
            let claimStatuses = {};
            let claimErrors = {};
            for (const offer of state.availableOffers) {
                claimStatuses[offer.id] = 'idle';
                claimErrors[offer.id] = null;
            }
            state.claimOfferStatuses = claimStatuses;
            state.claimOfferErrors = claimErrors;
            state.getAvailableOffersStatus = 'idle';
        },
        getAvailableOffersFailed(state, action) {
            state.getAvailableOffersError = action.payload;
            state.getAvailableOffersStatus = 'idle';
        },
        getReceivedFoodStarted(state) {
            state.getReceivedFoodError = null;
            state.getReceivedFoodStatus = 'loading';
        },
        getReceivedFoodSuccess(state, action) {
            state.receivedFood = action.payload;
            let cancelStatuses = {};
            let cancelErrors = {};
            for (const offer of state.receivedFood) {
                cancelStatuses[offer.id] = 'idle';
                cancelErrors[offer.id] = null;
            }
            state.cancelClaimStatuses = cancelStatuses;
            state.cancelClaimErrors = cancelErrors;
            state.getReceivedFoodStatus = 'idle';
        },
        getReceivedFoodFailed(state, action) {
            state.getReceivedFoodError = action.payload;
            state.getReceivedFoodStatus = 'idle';
        },
        setActiveClaims(state, action) {
            state.activeClaims = action.payload;
        },
        setReceiveDetailPost(state, action) {
            state.receiveDetailPost = action.payload
        }
    },
});

const cancelClaim = (postId) => async dispatch => {
    dispatch(cancelClaimStarted(postId));
    try {
        await removeRecipient(postId);
        dispatch(cancelClaimSuccess(postId));
        dispatch(fetchAvailableOffers());
    }
    catch (err) {
        console.error(err);
        dispatch(cancelClaimFailed({ id: postId, error: err.toString() }));
    }
}

const claimOffer = (postId) => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(claimOfferStarted(postId));
    try {
        await setRecipient(postId, email);
        dispatch(claimOfferSuccess(postId));
        dispatch(fetchAvailableOffers());
    }
    catch (err) {
        console.error(err);
        dispatch(claimOfferFailed({ id: postId, error: err.toString() }));
    }
}

const confirmDelivery = (postId) => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(confirmDeliveryStarted(postId));
    try {
        await setStatusDelivered(postId);
        dispatch(confirmDeliverySuccess(postId));
    }
    catch (err) {
        console.error(err);
        dispatch(confirmDeliveryFailed({ id: postId, error: err.toString() }));
    }
}

const fetchAvailableOffers = () => async dispatch => {
    dispatch(getAvailableOffersStarted());
    try {
        const posts = await getAvailableOffers();
        let availableOffers = [];
        posts.forEach(doc => {
            let postData = convertTimestamps(doc.data());
            availableOffers.push({
                id: doc.id,
                data: postData
            });
        })
        dispatch(getAvailableOffersSuccess(availableOffers));
    } catch (err) {
        dispatch(getAvailableOffersFailed(err.toString()));
    }
}

const fetchReceivedFood = () => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(getReceivedFoodStarted());
    try {
        postsRef.where("foodRecipient", "==", email)
            .onSnapshot((posts) => {
                let claims = [];
                let activeClaims = [];
                posts.forEach(doc => {
                    let postData = convertTimestamps(doc.data());
                    let claim = {
                        id: doc.id,
                        data: postData
                    };
                    claims.push(claim);

                    const status = claim.data.status;
                    if (status !== "delivered") {
                        activeClaims.push(claim);
                    }
                });
                dispatch(setActiveClaims(activeClaims));
                dispatch(getReceivedFoodSuccess(claims));
            });
    } catch (err) {
        console.error(err.toString());
        dispatch(getReceivedFoodFailed(err.toString()));
    }
}

const { actions, reducer } = foodReceptionSlice;
export const {
    cancelClaimStarted, cancelClaimSuccess, cancelClaimFailed,
    claimOfferStarted, claimOfferSuccess, claimOfferFailed,
    confirmDeliveryStarted, confirmDeliverySuccess, confirmDeliveryFailed,
    getAvailableOffersStarted, getAvailableOffersSuccess, getAvailableOffersFailed,
    getReceivedFoodStarted, getReceivedFoodSuccess, getReceivedFoodFailed,
    setActiveClaims, setReceiveDetailPost
} = actions;
export { cancelClaim, claimOffer, confirmDelivery, fetchAvailableOffers, fetchReceivedFood };
export default reducer;
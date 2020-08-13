import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { getAvailableOffers, getReceivedFood, removeRecipient, setRecipient } from "../services/FirebaseService";

let initialState = {
    availableOffers: [],
    cancelClaimErrors: {},
    cancelClaimStatuses: {},
    claimOfferErrors: {},
    claimOfferStatuses: {},
    getAvailableOffersError: null,
    getAvailableOffersStatus: "idle",
    getReceivedFoodError: null,
    getReceivedFoodStatus: "idle",
    receivedFood: []
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
        }
    },
});

const cancelClaim = (postId, email) => async dispatch => {
    dispatch(cancelClaimStarted(postId));
    try {
        await removeRecipient(postId);
        dispatch(cancelClaimSuccess(postId));
        dispatch(fetchReceivedFood(email));
        dispatch(fetchAvailableOffers());
    }
    catch (err) {
        console.error(err);
        dispatch(cancelClaimFailed({ id: postId, error: err.toString() }));
    }
}

const claimOffer = (postId, email) => async dispatch => {
    dispatch(claimOfferStarted(postId));
    try {
        await setRecipient(postId, email);
        dispatch(claimOfferSuccess(postId));
        dispatch(fetchAvailableOffers());
        dispatch(fetchReceivedFood(email));
    }
    catch (err) {
        console.error(err);
        dispatch(claimOfferFailed({ id: postId, error: err.toString() }));
    }
}

const fetchAvailableOffers = () => async dispatch => {
    dispatch(getAvailableOffersStarted());
    try {
        const posts = await getAvailableOffers();
        let availableOffers = [];
        posts.forEach(doc => {
            let postData = doc.data();
            delete postData['claimed'];
            delete postData['created'];
            delete postData['pendingAssignmentSince'];
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

const fetchReceivedFood = (email) => async dispatch => {
    dispatch(getReceivedFoodStarted());
    try {
        const posts = await getReceivedFood(email);
        let receivedFood = [];
        posts.forEach(doc => {
            let postData = doc.data();
            delete postData['claimed'];
            delete postData['created'];
            delete postData['pendingAssignmentSince'];
            receivedFood.push({
                id: doc.id,
                data: postData
            });
        })
        dispatch(getReceivedFoodSuccess(receivedFood));
    } catch (err) {
        dispatch(getReceivedFoodFailed(err.toString()));
    }
}

const { actions, reducer } = foodReceptionSlice;
export const {
    cancelClaimStarted, cancelClaimSuccess, cancelClaimFailed,
    claimOfferStarted, claimOfferSuccess, claimOfferFailed,
    getAvailableOffersStarted, getAvailableOffersSuccess, getAvailableOffersFailed,
    getReceivedFoodStarted, getReceivedFoodSuccess, getReceivedFoodFailed
} = actions;
export { cancelClaim, claimOffer, fetchAvailableOffers, fetchReceivedFood };
export default reducer;
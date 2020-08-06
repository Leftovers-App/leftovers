import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { getAvailableOffers, setRecipient } from "../services/FirebaseService";

let initialState = {
    availableOffers: [],
    claimOfferErrors: {},
    claimOfferStatuses: {},
    getAvailableOffersError: null,
    getAvailableOffersStatus: "idle"
};

const foodReceptionSlice = createSlice({
    name: "foodReception",
    initialState,
    reducers: {
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
        }
    },
});

const claimOffer = (postId, email) => async dispatch => {
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

const fetchAvailableOffers = () => async dispatch => {
    dispatch(getAvailableOffersStarted());
    try {
        const posts = await getAvailableOffers();
        let availableOffers = [];
        posts.forEach(doc => {
            availableOffers.push({
                id: doc.id,
                data: doc.data()
            });
        })
        dispatch(getAvailableOffersSuccess(availableOffers));
    } catch (err) {
        dispatch(getAvailableOffersFailed(err.toString()));
    }
}

const { actions, reducer } = foodReceptionSlice;
export const {
    claimOfferStarted, claimOfferSuccess, claimOfferFailed,
    getAvailableOffersStarted, getAvailableOffersSuccess, getAvailableOffersFailed
} = actions;
export { claimOffer, fetchAvailableOffers };
export default reducer;
import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { getAvailableOffers } from "../services/FirebaseService";

let initialState = {
    availableOffers: [],
    getAvailableOffersError: null,
    getAvailableOffersStatus: "idle"
};

const foodReceptionSlice = createSlice({
    name: "foodReception",
    initialState,
    reducers: {
        getAvailableOffersStarted(state) {
            state.getAvailableOffersError = null;
            state.getAvailableOffersStatus = 'loading';
        },
        getAvailableOffersSuccess(state, action) {
            state.availableOffers = action.payload;
            state.getAvailableOffersStatus = 'idle';
        },
        getAvailableOffersFailed(state, action) {
            state.getAvailableOffersError = action.payload;
            state.getAvailableOffersStatus = 'idle';
        }
    },
});

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
    getAvailableOffersStarted, getAvailableOffersSuccess, getAvailableOffersFailed
} = actions;
export { fetchAvailableOffers };
export default reducer;
import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { createFoodDonation, deleteFoodDonation, getFoodDonations } from "../services/FirebaseService";

let initialState = {
    createFoodDonationError: null,
    createFoodDonationStatus: 'idle',
    deleteFoodDonationErrors: {},
    deleteFoodDonationStatuses: {},
    foodDonations: [],
    getFoodDonationsError: null,
    getFoodDonationsStatus: "idle",
    newDonationId: null
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createFoodDonationStarted(state, action) {
            state.createFoodDonationError = null;
            state.createFoodDonationStatus = 'loading';
        },
        createFoodDonationSuccess(state, action) {
            state.newDonationId = action.payload
            state.createFoodDonationStatus = 'idle';
        },
        createFoodDonationFailed(state, action) {
            state.createFoodDonationError = action.payload;
            state.createFoodDonationStatus = 'idle';
        },
        createFoodDonationReset(state, action) {
            state.createFoodDonationError = null;
            state.createFoodDonationStatus = 'idle';
            state.newDonationId = null;
        },
        deleteFoodDonationStarted(state, action) {
            state.deleteFoodDonationErrors[action.payload] = null;
            state.deleteFoodDonationStatuses[action.payload] = 'loading';
        },
        deleteFoodDonationSuccess(state, action) {
            state.deleteFoodDonationStatuses[action.payload] = 'idle';
        },
        deleteFoodDonationFailed(state, action) {
            state.deleteFoodDonationErrors[action.payload.id] = action.payload.error;
            state.deleteFoodDonationStatuses[action.payload.id] = 'idle';
        },
        getFoodDonationsStarted(state) {
            state.getFoodDonationsError = null;
            state.getFoodDonationsStatus = 'loading';
        },
        getFoodDonationsSuccess(state, action) {
            state.foodDonations = action.payload;
            let deleteStatuses = {};
            let deleteErrors = {};
            for (const donation of state.foodDonations) {
                deleteStatuses[donation.id] = 'idle';
                deleteErrors[donation.id] = null;
            }
            state.deleteFoodDonationStatuseses = deleteStatuses;
            state.deleteFoodDonationErrors = deleteErrors;
            state.getFoodDonationsStatus = 'idle';
        },
        getFoodDonationsFailed(state, action) {
            state.getFoodDonationsError = action.payload;
            state.getFoodDonationsStatus = 'idle';
        }
    },
});

const addFoodDonation = (email, newPostDesc) => async dispatch => {
    dispatch(createFoodDonationStarted());
    try {
        const newDocId = await createFoodDonation(email, newPostDesc);
        dispatch(createFoodDonationSuccess(newDocId));
        dispatch(fetchFoodDonations(email));
    } catch (err) {
        console.error("Error adding document: ", err);
        dispatch(createFoodDonationFailed(err.toString()));
    }
}

const cancelFoodDonation = (postId, email) => async dispatch => {
    dispatch(deleteFoodDonationStarted(postId));
    try {
        await deleteFoodDonation(postId);
        dispatch(deleteFoodDonationSuccess(postId));
        dispatch(fetchFoodDonations(email));
    }
    catch (err) {
        console.error(err);
        dispatch(deleteFoodDonationFailed({ id: postId, error: err.toString() }));
    }
}

const fetchFoodDonations = (email) => async dispatch => {
    dispatch(getFoodDonationsStarted());
    try {
        const posts = await getFoodDonations(email);
        let foodDonations = [];
        posts.forEach(doc => {
            foodDonations.push({
                id: doc.id,
                data: doc.data()
            });
        })
        dispatch(getFoodDonationsSuccess(foodDonations));
    } catch (err) {
        dispatch(getFoodDonationsFailed(err.toString()));
    }
}

const { actions, reducer } = postSlice;
export const {
    createFoodDonationStarted, createFoodDonationSuccess, createFoodDonationFailed, createFoodDonationReset,
    deleteFoodDonationStarted, deleteFoodDonationSuccess, deleteFoodDonationFailed,
    getFoodDonationsStarted, getFoodDonationsSuccess, getFoodDonationsFailed
} = actions;
export { addFoodDonation, cancelFoodDonation, fetchFoodDonations };
export default reducer;
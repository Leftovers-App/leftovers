import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { deleteFoodDonation, getFoodDonations } from "../services/FirebaseService";

let initialState = {
    deleteFoodDonationStatuses: {},
    deleteFoodDonationErrors: {},
    getFoodDonationsStatus: "idle",
    foodDonations: [],
    getFoodDonationsError: null
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
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

const cancelFoodDonation = (postId, email) => async dispatch => {
    dispatch(deleteFoodDonationStarted(postId));
    try {
        await deleteFoodDonation(postId);
        dispatch(deleteFoodDonationSuccess(postId));
        dispatch(fetchFoodDonations(email));
    }
    catch (err) {
        console.log(err);
        dispatch(deleteFoodDonationFailed({ id: postId, error: err.toString() }));
    }
}

const { actions, reducer } = postSlice;
export const { deleteFoodDonationStarted, deleteFoodDonationSuccess, deleteFoodDonationFailed, getFoodDonationsStarted, getFoodDonationsSuccess, getFoodDonationsFailed } = actions;
export { cancelFoodDonation, fetchFoodDonations };
export default reducer;
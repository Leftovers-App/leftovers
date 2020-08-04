import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { getFoodDonations } from "../services/FirebaseService";

let initialState = {
    foodDonationsStatus: "idle",
    foodDonations: [],
    foodDonationsError: undefined
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        foodDonationsLoading(state) {
            state.foodDonationsStatus = "loading";
        },
        foodDonationsSuccess(state, action) {
            state.foodDonations = action.payload;
            state.foodDonationsStatus = 'idle';
        },
        foodDonationsFailed(state, action) {
            state.foodDonationsError = action.payload;
            state.foodDonationsStatus = 'idle';
        }
    },
});

const fetchFoodDonations = (email) => async dispatch => {
    dispatch(foodDonationsLoading());
    try {
        const posts = await getFoodDonations(email);
        let foodDonations = [];
        posts.forEach(doc => {
            foodDonations.push({
                id: doc.id,
                data: doc.data()
            });
        })
        dispatch(foodDonationsSuccess(foodDonations));
    } catch (err) {
        dispatch(foodDonationsFailed(err.toString()));
    }
}

const { actions, reducer } = postSlice;
export const { foodDonationsLoading, foodDonationsSuccess, foodDonationsFailed } = actions;
export { fetchFoodDonations };
export default reducer;
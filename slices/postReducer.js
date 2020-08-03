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
        // console.log('getting data in thunk...')
        // const response = await getFoodDonations(email);
        // await getFoodDonations(email);
        // console.log('got data in thunk!');
        // console.log(response);
        console.log('starting data get')
        const db = firebase.firestore();
        const postsRef = db.collection('posts');
        const postsQuery = postsRef.where('foodDonor', '==', email);
        await postsQuery.get()
            .then(posts => {
                let tempPosts = [];
                console.log('got data in firebase service!');
                posts.forEach(doc => {
                    tempPosts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                })
                dispatch(foodDonationsSuccess(tempPosts));
            });
        // dispatch(foodDonationsSuccess(response.data));
    } catch (err) {
        dispatch(foodDonationsFailed(err.toString()));
    }
    console.log('end of thunk')
}

const { actions, reducer } = postSlice;
export const { foodDonationsLoading, foodDonationsSuccess, foodDonationsFailed } = actions;
export { fetchFoodDonations };
export default reducer;
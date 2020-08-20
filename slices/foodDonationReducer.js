import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { createFoodDonation, deleteFoodDonation, postsRef, setStatusPickedUp } from "../services/FirebaseService";
import { convertTimestamps } from "../services/TimestampUtil";

let initialState = {
    activeDonations: [],
    createFoodDonationError: null,
    createFoodDonationStatus: 'idle',
    confirmPickupErrors: {},
    confirmPickupStatuses: {},
    deleteFoodDonationErrors: {},
    deleteFoodDonationStatuses: {},
    foodDonations: [],
    getFoodDonationsError: null,
    getFoodDonationsStatus: "idle",
    newFoodDonationId: null
};

const foodDonationSlice = createSlice({
    name: "foodDonation",
    initialState,
    reducers: {
        createFoodDonationStarted(state, action) {
            state.createFoodDonationError = null;
            state.createFoodDonationStatus = 'loading';
        },
        createFoodDonationSuccess(state, action) {
            state.newFoodDonationId = action.payload
            state.createFoodDonationStatus = 'idle';
        },
        createFoodDonationFailed(state, action) {
            state.createFoodDonationError = action.payload;
            state.createFoodDonationStatus = 'idle';
        },
        createFoodDonationReset(state, action) {
            state.createFoodDonationError = null;
            state.createFoodDonationStatus = 'idle';
            state.newFoodDonationId = null;
        },
        confirmPickupStarted(state, action) {
            state.confirmPickupErrors[action.payload] = null;
            state.confirmPickupStatuses[action.payload] = 'loading';
        },
        confirmPickupSuccess(state, action) {
            state.confirmPickupStatuses[action.payload] = 'idle';
        },
        confirmPickupFailed(state, action) {
            state.confirmPickupErrors[action.payload.id] = action.payload.error;
            state.confirmPickupStatuses[action.payload.id] = 'idle';
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
            state.deleteFoodDonationStatuses = deleteStatuses;
            state.deleteFoodDonationErrors = deleteErrors;
            state.getFoodDonationsStatus = 'idle';
        },
        getFoodDonationsFailed(state, action) {
            state.getFoodDonationsError = action.payload;
            state.getFoodDonationsStatus = 'idle';
        },
        setActiveDonations(state, action) {
            state.activeDonations = action.payload;
        }
    },
});

const addFoodDonation = (newPostDesc) => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(createFoodDonationStarted());
    try {
        const newDocId = await createFoodDonation(email, newPostDesc);
        dispatch(createFoodDonationSuccess(newDocId));
    } catch (err) {
        console.error("Error adding document: ", err);
        dispatch(createFoodDonationFailed(err.toString()));
    }
}

const cancelFoodDonation = (postId) => async dispatch => {
    dispatch(deleteFoodDonationStarted(postId));
    try {
        await deleteFoodDonation(postId);
        dispatch(deleteFoodDonationSuccess(postId));
    }
    catch (err) {
        console.error(err);
        dispatch(deleteFoodDonationFailed({ id: postId, error: err.toString() }));
    }
}

const confirmPickup = (postId) => async dispatch => {
    dispatch(confirmPickupStarted(postId));
    try {
        await setStatusPickedUp(postId);
        dispatch(confirmPickupSuccess(postId));
    }
    catch (err) {
        console.error(err);
        dispatch(confirmPickupFailed({ id: postId, error: err.toString() }));
    }
}

const fetchFoodDonations = () => async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(getFoodDonationsStarted());
    try {
        postsRef.where("foodDonor", "==", email)
            .onSnapshot((posts) => {
                let donations = [];
                let activeDonations = [];
                posts.forEach(doc => {
                    let postData = convertTimestamps(doc.data());
                    let donation = {
                        id: doc.id,
                        data: postData
                    };
                    donations.push(donation);

                    if (donation.data.status !== "delivered") {
                        activeDonations.push(donation);
                    }
                });
                dispatch(setActiveDonations(activeDonations));
                dispatch(getFoodDonationsSuccess(donations));
            });
    } catch (err) {
        console.error(err.toString());
        dispatch(getFoodDonationsFailed(err.toString()));
    }
}

const { actions, reducer } = foodDonationSlice;
export const {
    createFoodDonationStarted, createFoodDonationSuccess, createFoodDonationFailed, createFoodDonationReset,
    confirmPickupStarted, confirmPickupSuccess, confirmPickupFailed,
    deleteFoodDonationStarted, deleteFoodDonationSuccess, deleteFoodDonationFailed,
    getFoodDonationsStarted, getFoodDonationsSuccess, getFoodDonationsFailed,
    setActiveDonations
} = actions;
export { addFoodDonation, cancelFoodDonation, confirmPickup, fetchFoodDonations };
export default reducer;
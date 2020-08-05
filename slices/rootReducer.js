import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import foodDonationSlice from "./foodDonationReducer";

const rootReducer = combineReducers({
    auth: authSlice,
    foodDonation: foodDonationSlice
});

export default rootReducer;
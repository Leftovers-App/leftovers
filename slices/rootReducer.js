import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import foodDonationSlice from "./foodDonationReducer";
import foodReceptionSlice from "./foodReceptionReducer";

const rootReducer = combineReducers({
    auth: authSlice,
    foodDonation: foodDonationSlice,
    foodReception: foodReceptionSlice
});

export default rootReducer;
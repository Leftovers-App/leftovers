import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import foodDonationSlice from "./foodDonationReducer";
import foodReceptionSlice from "./foodReceptionReducer";
import foodDeliverySlice from "./foodDeliveryReducer";

const rootReducer = combineReducers({
    auth: authSlice,
    foodDonation: foodDonationSlice,
    foodDelivery: foodDeliverySlice,
    foodReception: foodReceptionSlice
});

export default rootReducer;
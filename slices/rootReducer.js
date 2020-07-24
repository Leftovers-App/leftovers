import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
const rootReducer = combineReducers({
    auth: authSlice
});

export default rootReducer;
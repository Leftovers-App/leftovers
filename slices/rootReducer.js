import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authReducer";
import postSlice from "./postReducer";

const rootReducer = combineReducers({
    auth: authSlice,
    post: postSlice
});

export default rootReducer;
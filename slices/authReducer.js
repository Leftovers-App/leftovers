import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: currentState = {
    isLoadingComplete: false,
    isAuthenticationReady: false,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
});

export const {
} = authSlice.actions;

export default authSlice.reducer;
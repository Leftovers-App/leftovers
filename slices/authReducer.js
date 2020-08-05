import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
    email: undefined,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn(state, action) {
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        signOut(state) {
            state.isAuthenticated = false;
            state.email = null;
        },
    },
});

const { actions, reducer } = authSlice;
export const { signIn, signOut } = actions;
export default reducer;
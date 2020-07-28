import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: currentState = {
    email: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn(state, action) {
            state.email = action.payload.email;
        },
        signOut(state) {
            state.email = null;
        },
    },
});

const { actions, reducer } = authSlice;
export const { signIn, signOut } = actions;
export default reducer;
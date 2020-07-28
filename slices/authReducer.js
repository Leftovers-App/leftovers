import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
    currentUser: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload.currentUser;
        },
    },
});

const { actions, reducer } = authSlice;
export const { setCurrentUser } = actions;
export default reducer;
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

const store = configureStore({
    reducer: rootReducer,
});

export default store;
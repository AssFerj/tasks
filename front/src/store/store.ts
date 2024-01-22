import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./modules/rootReducers";

export const store = configureStore({
    reducer: combineReducers
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
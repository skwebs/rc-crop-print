import { configureStore } from "@reduxjs/toolkit";
import cropReducer from './slices/cropSlice'

// exported store
export const store = configureStore({
    reducer:cropReducer
});

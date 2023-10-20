import { configureStore } from "@reduxjs/toolkit";
import cropReducer from '../features/crop/cropSlice'

// exported store
export const store = configureStore({
    reducer:cropReducer
});

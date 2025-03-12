import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { placeOrderReducer } from "./reducers/orderReducer"; 

const store = configureStore({
  reducer: {
    order: placeOrderReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

export default store;
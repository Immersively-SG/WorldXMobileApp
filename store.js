import { configureStore } from "@reduxjs/toolkit";
import paymentScreenReducer from "./features/paymentscreenslice";
export const store = configureStore({
  reducer: {
    paymentScreen: paymentScreenReducer,
  },
});

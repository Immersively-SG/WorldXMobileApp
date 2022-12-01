import { configureStore } from "@reduxjs/toolkit";
import paymentScreenReducer from "./features/paymentscreenslice";
import worldxpointsReducer from "./features/worldxpointsslice";
import nftreducer from "./features/nftslice";

export const store = configureStore({
  reducer: {
    paymentScreen: paymentScreenReducer,
    worldxpoints: worldxpointsReducer,
    nft: nftreducer,
  },
});

import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { RandomRangeInt } from "../components/utility/math/math";

const CASHBACK_VALUES = [10, 15, 20, 25, 50];
const LIMIT_VALUES = [50, 100, 150, 200, 250, 300];

const loyaltyInitialState = {
  cardCashbackPercent: 0,
  accumulatedCashback: 0.0,
  currentCashback: 0.0,
  cashbackHistoryArray: [],
  cashbackLimit: 0.0,
  isLoyalty: false,
};

const loyaltyCardSlice = createSlice({
  name: "loyaltyCard",
  initialState: loyaltyInitialState,
  reducers: {
    incrementAccumulatedCashback: (state, action) => {
      state.accumulatedCashback += parseFloat(action.payload);
      return state;
    },
    setCurrentCashback: (state, action) => {
      state.currentCashback = parseFloat(action.payload);
      return state;
    },
    pushToCashbackHistoryArray: (state, action) => {
      state.cashbackHistoryArray.push(action.payload);

      return state;
    },
    resetLoyaltyCard: (state) => {
      state = { ...loyaltyInitialState }; //reset to initial state
      return state;
    },

    rerollLoyaltyCard: (state) => {
      var newState = { ...loyaltyInitialState };

      newState.cardCashbackPercent =
        CASHBACK_VALUES[RandomRangeInt(0, CASHBACK_VALUES.length - 1)];
      newState.cashbackLimit =
        LIMIT_VALUES[RandomRangeInt(0, LIMIT_VALUES.length - 1)];

      newState.isLoyalty = true;

      state = newState;
      return state;
    },
  },
});

export const {
  incrementAccumulatedCashback,
  setCurrentCashback,
  pushToCashbackHistoryArray,
  rerollLoyaltyCard,
} = loyaltyCardSlice.actions;

export default combineReducers({
  loyaltyCardSlice: loyaltyCardSlice.reducer,
});

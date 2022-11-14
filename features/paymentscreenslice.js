import { createSlice, combineReducers } from "@reduxjs/toolkit";

const loyaltyInitialState = {
  cardCashbackPercent: 0,
  accumulatedCashback: 0.0,
  cashbackHistoryArray: [],
  isLoyalty: false,
};

const loyaltyCardSlice = createSlice({
  name: "loyaltyCard",
  initialState: loyaltyInitialState,
  reducers: {
    saveLoyaltyCardSlice: (state, action) => {
      state = action.payload;

      return state;
    },
    incrementAccumulatedCashback: (state, action) => {
      state.accumulatedCashback += parseFloat(action.payload);
      return state;
    },
    setAccumulatedCashback: (state, action) => {
      state.accumulatedCashback = parseFloat(action.payload);
      return state;
    },
    pushToCashbackHistoryArray: (state, action) => {
      state.cashbackHistoryArray.push(action.payload);

      return state;
    },
  },
});

export const {
  saveLoyaltyCardSlice,
  incrementAccumulatedCashback,
  setAccumulatedCashback,
  pushToCashbackHistoryArray,
} = loyaltyCardSlice.actions;

export default combineReducers({
  loyaltyCardSlice: loyaltyCardSlice.reducer,
});

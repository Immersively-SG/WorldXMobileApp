import { createSlice, combineReducers } from "@reduxjs/toolkit";

const worldxpointsInitialState = {
  totalPoints: 0,
  totalLevel: 0,
};

const worldxpointsSlice = createSlice({
  name: "worldxpoints",
  initialState: worldxpointsInitialState,
  reducers: {
    incrementPoints: (state, action) => {
      state.totalPoints += action.payload;
      return state;
    },
    incrementLevel: (state) => {
      state.totalLevel += action.payload;
      return state;
    },
  },
});

export const { incrementPoints, incrementLevel } = worldxpointsSlice.actions;

export default worldxpointsSlice.reducer;

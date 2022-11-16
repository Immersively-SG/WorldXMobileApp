import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { RandomRangeInt } from "../components/utility/math/math";

const RedeemData = [
  {
    name: "Nike",
    dollarArray: [10, 20, 30],
    icon: require("../assets/WorldX/Logo/nikelogo.png"),
  },
  {
    name: "Grab",
    dollarArray: [10, 20, 30],
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
  {
    name: "FoodPanda",
    dollarArray: [10, 20, 30],
    icon: require("../assets/WorldX/Logo/foodpandalogo.png"),
  },
];

const TestReward = [
  {
    name: "Grab",
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
  {
    name: "Grab",
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
  {
    name: "Grab",
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
  {
    name: "Grab",
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
  {
    name: "Grab",
    icon: require("../assets/WorldX/Logo/grablogo.png"),
  },
];

const GenerateRedeem = () => {
  var redeemArray = [];

  RedeemData.forEach((element) => {
    const dealName = element.name;
    const icon = element.icon;
    element.dollarArray.forEach((dollar) => {
      const redeemElement = {
        name: dealName,
        dollar: dollar,
        points: parseInt(dollar * 100),
        icon: icon,
      };
      redeemArray.push(redeemElement);
    });
  });

  return redeemArray;
};

const worldxpointsInitialState = {
  totalPoints: 0,
  totalLevel: 0,
  pointsLog: [],
  redeem: GenerateRedeem(),
  reward: TestReward,
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
    addToReward: (state, action) => {
      state.reward.push(action.payload);
      return state;
    },
  },
});

export const { incrementPoints, incrementLevel, addToReward } =
  worldxpointsSlice.actions;

export default worldxpointsSlice.reducer;

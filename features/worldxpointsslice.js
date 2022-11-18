import { createSlice } from "@reduxjs/toolkit";
import { RandomString } from "../components/utility/math/math";
import { Toast } from "react-native-toast-message/lib/src/Toast";
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
  expToNextLevel: 1000,
  currentExp: 0,

  totalLevel: 0,
  pointsLog: [],
  redeem: GenerateRedeem(),
  reward: [],
  userid: RandomString(15),
};

const worldxpointsSlice = createSlice({
  name: "worldxpoints",
  initialState: worldxpointsInitialState,
  reducers: {
    //takes into account negative values
    incrementPoints: (state, action) => {
      if (parseInt(action.payload) > 0) {
        state.currentExp += parseInt(action.payload);

        //level up
        while (state.currentExp >= state.expToNextLevel) {
          ++state.totalLevel;
          state.currentExp -= state.expToNextLevel;
          state.expToNextLevel += 500;
        }
      }

      state.totalPoints += parseInt(action.payload);
      return state;
    },
    setLevel: (state) => {
      state.totalLevel = action.payload;
      return state;
    },
    addToReward: (state, action) => {
      state.reward.push(action.payload);
      return state;
    },

    removeFromReward: (state, action) => {
      //remove the item from the array
      const index = state.reward.findIndex((element) => {
        return action.payload.code === element.code;
      });
      if (index > -1) {
        state.reward.splice(index, 1);
      }

      return state;
    },
    setUseReward: (state, action) => {
      //remove the item from the array
      const index = state.reward.findIndex((element) => {
        return action.payload.code === element.code;
      });
      if (index > -1) {
        state.reward[index].used = true;
      }

      return state;
    },
    addToPointsLog: (state, action) => {
      state.pointsLog.unshift(action.payload);
      return state;
    },
  },
});

export const {
  incrementPoints,
  setLevel,
  addToReward,
  addToPointsLog,
  removeFromReward,
  setUseReward,
} = worldxpointsSlice.actions;

export default worldxpointsSlice.reducer;

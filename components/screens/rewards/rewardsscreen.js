import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useState } from "react";
import { RewardsTabs } from "./rewardstabs";
import { RewardsHeader } from "./rewardsheader";
import { RewardsPage } from "./rewardspage";

export const RewardsScreen = () => {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <View style={[styles.rewardsscreen]}>
      <RewardsHeader
        style={[styles.rewardsheader]}
        subText={subtextArray[pageIndex]}
      />
      <RewardsPage style={[styles.rewardspage]} pageIndex={pageIndex} />
      <RewardsTabs style={[]} handleTabClicked={setPageIndex} />
    </View>
  );
};

const styles = EStyleSheet.create({
  rewardsscreen: {
    flex: 1,
    justifyContent: "space-between",
  },
  rewardsheader: {
    margin: "1rem",
  },
  rewardspage: {
    flex: 1,
    width: "100%",
  },
});

const subtextArray = [
  "Redeem your preferred reward with accumulated points!",
  "Use any of your redeemed rewards here.",
  "Review points record here.",
];

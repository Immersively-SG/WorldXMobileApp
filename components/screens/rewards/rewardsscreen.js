import { RewardsTabs } from "./rewardstabs";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const RewardsScreen = () => {
  return (
    <View style={[styles.rewardsscreen]}>
      <RewardsTabs />
    </View>
  );
};

const styles = EStyleSheet.create({
  rewardsscreen: {
    flex: 1,
    justifyContent: "space-between",
  },
});

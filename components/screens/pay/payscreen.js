import { Text, View } from "react-native-animatable";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { PayScreenHeader } from "./payscreenheader";
import { PayScreenLoyaltyCard } from "./payscreenloyaltycard";
export const PayScreen = () => {
  return (
    <View style={[worldxstyles.container, { flex: 1 }]}>
      <PayScreenHeader />
      <PayScreenLoyaltyCard
        style={[{ flex: 1, width: "100%" }, worldxstyles.bordered]}
      />
    </View>
  );
};

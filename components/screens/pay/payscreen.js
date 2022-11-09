import { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { PayScreenDetails } from "./payscreendetails";
import { PayScreenHeader } from "./payscreenheader";
import { PayScreenLoyaltyCard } from "./payscreenloyaltycard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { Prompt_600SemiBold } from "@expo-google-fonts/dev";
import { PayScreenQRScan } from "./payscreenqrscan";

export const PayScreen = () => {
  const [isLoyalty, setIsLoyalty] = useState(false);

  return (
    <View style={[worldxstyles.container, { flex: 1 }]}>
      <PayScreenHeader
        style={[
          {
            flex: 1,
            width: "100%",
          },
        ]}
      />
      <PayScreenLoyaltyCard
        style={[{ flex: 2, width: "100%", marginTop: 20 }]}
        onPurchaseLoyalty={setIsLoyalty}
      />
      <PayScreenDetails
        style={[
          {
            flex: 4,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        ]}
        isLoyalty={isLoyalty}
      />

      <TouchableShadowButton
        style={{
          justifyContent: "center",
          borderRadius: Dimensions.get("window").width / 2,
          padding: 20,
        }}
        onPress={() => {
          console.log("sdfds");
        }}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={30} color="white" />
      </TouchableShadowButton>
      <Text style={[worldxstyles.text, worldxstyles.textBold]}>
        Scan and pay
      </Text>
    </View>
  );
};

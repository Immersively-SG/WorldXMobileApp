import { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { PayScreenDetails } from "./payscreendetails";
import { PayScreenHeader } from "./payscreenheader";
import { PayScreenLoyaltyCard } from "./payscreenloyaltycard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { PayScreenQRScan } from "./payscreenqrscan";
import { PayScreenPayment } from "./payscreenpayment";
import { RandomString, RandomRangeInt } from "../../utility/math/math";
export const PayScreen = () => {
  const [isLoyalty, setIsLoyalty] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const ScanButton = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableShadowButton
          style={{
            justifyContent: "center",
            borderRadius: Dimensions.get("window").width / 2,
            padding: 20,
          }}
          onPress={() => {
            return setQrModalVisible(true);
          }}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={30} color="white" />
        </TouchableShadowButton>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            { textAlign: "center" },
          ]}
        >
          Scan and pay
        </Text>
      </View>
    );
  };

  return (
    <View style={[worldxstyles.container, { flex: 1 }]}>
      <PayScreenHeader
        style={[
          {
            flex: 1,
            width: "100%",
            justifyContent: "flex-start",
          },
        ]}
      />
      {isPayment ? (
        <>
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

          <ScanButton />

          <PayScreenQRScan
            visible={qrModalVisible}
            onSetModalVisible={setQrModalVisible}
            onSetPayment={setPaymentData}
          />
        </>
      ) : (
        <View style={[worldxstyles.container, { flex: 4, width: "100%" }]}>
          <PayScreenPayment
            style={[worldxstyles.container, { flex: 1, width: "100%" }]}
          />
        </View>
      )}
    </View>
  );
};

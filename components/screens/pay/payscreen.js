import { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";

import { PayScreenDetails } from "./payscreendetails";
import { PayScreenHeader } from "./payscreenheader";
import { PayScreenLoyaltyCard } from "./payscreenloyaltycard";
import { PayScreenQRScan } from "./payscreenqrscan";
import { PayScreenPayment } from "./payscreenpayment";

import { useSelector } from "react-redux";

export const PayScreen = () => {
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const isLoyalty = useSelector((state) => {
    return state.paymentScreen.loyaltyCardSlice.isLoyalty;
  });

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
            //return setQrModalVisible(true); //uncomment for qr screen
            setPaymentData({});
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
        isRenderSubtext={paymentData == null}
        label={isPaid ? "Payment Complete!" : "Scan and Pay"}
      />
      {!paymentData ? (
        <>
          <PayScreenLoyaltyCard
            style={[{ flex: 2, width: "100%", marginTop: 20 }]}
            isLoyalty={isLoyalty}
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
          />

          <ScanButton />

          <PayScreenQRScan
            visible={qrModalVisible}
            onSetModalVisible={setQrModalVisible}
            onSetPayment={setPaymentData}
          />
        </>
      ) : (
        <View style={[worldxstyles.container, { flex: 5, width: "100%" }]}>
          <PayScreenPayment
            style={[worldxstyles.container, { flex: 1, width: "100%" }]}
            setPaymentData={setPaymentData}
            onPaid={setIsPaid}
          />
        </View>
      )}
    </View>
  );
};

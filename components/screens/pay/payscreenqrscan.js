import { Modal, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { withDecay } from "react-native-reanimated";

export const PayScreenQRScan = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        props.onSetModalVisible(false);
      }}
    >
      <View
        style={[
          {
            flex: 1,

            alignItems: "center",
            backgroundColor: "black",
          },
        ]}
      >
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            setScanned(true);
            props.onSetModalVisible(false);
            props.onSetPayment(data);
          }}
          style={[{ flex: 1, width: "100%", height: undefined }]}
          hardwareAccelerated={true}
        />
        <TouchableShadowButton
          style={{
            padding: 5,
          }}
          onPress={() => {
            return props.onSetModalVisible(false);
          }}
        >
          <Text style={[worldxstyles.text]}>Cancel scan</Text>
        </TouchableShadowButton>
      </View>
    </Modal>
  );
};

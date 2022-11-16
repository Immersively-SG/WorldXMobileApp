import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  worldxstyles,
  worldxstyleconstants,
} from "../../../../stylesheets/worldxstylesheet";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { TouchableShadowButton } from "../../../utility/touchable/touchableshadowbutton";
import { BackgroundOverlay } from "../../../utility/containers/backgroundoverlay";
import * as Clipboard from "expo-clipboard";
import { RandomString } from "../../../utility/math/math";

export const RewardsSection = (props) => {
  const rewardsArray = useSelector((state) => state.worldxpoints.reward);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedRewardData, setSelectedRewardData] = useState({});
  useEffect(() => {}, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={[styles.rewardelement, worldxstyles.bordered]}>
        <Image
          source={item.icon}
          style={[styles.rewardlogo, worldxstyles.bordered]}
        />
        <View style={[styles.rewarddetails]}>
          <Text style={[worldxstyles.text, { alignSelf: "flex-start" }]}>
            {item.name} Voucher
          </Text>
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableShadowButton
              onPress={() => {
                setIsConfirmModalVisible(true);
                setSelectedRewardData({
                  name: item.name + " Voucher",
                  icon: item.icon,
                });
              }}
              style={[styles.button, { alignSelf: "flex-end" }]}
            >
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                Use
              </Text>
            </TouchableShadowButton>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <Animatable.View
      style={[props.style]}
      animation={"fadeInUp"}
      duration={500}
    >
      <FlatList
        style={[props.style]}
        data={rewardsArray}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      <ConfirmModal
        isVisible={isConfirmModalVisible}
        handleClose={setIsConfirmModalVisible}
        handleConfirm={setIsRewardModalVisible}
        selectedRewardData={selectedRewardData}
      />
      <RewardModal
        isVisible={isRewardModalVisible}
        handleClose={setIsRewardModalVisible}
        selectedRewardData={selectedRewardData}
      />
    </Animatable.View>
  );
};

const ConfirmModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.handleClose(false);
      }}
      statusBarTranslucent={true}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <BackgroundOverlay />
        <View style={[styles.confirmmodal, worldxstyles.bordered]}>
          <Image
            source={props.selectedRewardData.icon}
            style={[styles.rewardlogo, worldxstyles.bordered]}
          />
          <Text style={[worldxstyles.text, worldxstyles.textBold]}>
            You are about to use {props.selectedRewardData.name}
          </Text>
          <View style={[worldxstyles.flexRow]}>
            <TouchableShadowButton
              style={[styles.button]}
              containerStyle={styles.buttonShadow}
              onPress={() => {
                props.handleClose(false);
                props.handleConfirm(true);
              }}
            >
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                CONFIRM
              </Text>
            </TouchableShadowButton>
            <TouchableShadowButton
              style={[styles.button]}
              containerStyle={styles.buttonShadow}
              onPress={() => props.handleClose(false)}
            >
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                CLOSE
              </Text>
            </TouchableShadowButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const RewardModal = (props) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    setCode(RandomString(20));
  }, [props]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.handleClose(false);
      }}
      statusBarTranslucent={true}
    >
      <View
        style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
      >
        <BackgroundOverlay />
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            worldxstyles.textSmallMedium,
            styles.rewardVoucherText,
          ]}
        >
          Voucher Redeemed!
        </Text>
        <View style={[styles.rewardmodal, worldxstyles.bordered]}>
          <View style={[worldxstyles.flexRow, { alignItems: "center" }]}>
            <Image
              source={props.selectedRewardData.icon}
              style={[styles.rewardlogo, worldxstyles.bordered]}
            />
            <Text
              style={[
                worldxstyles.text,
                worldxstyles.textSmallMedium,
                worldxstyles.textBold,
                styles.rewardText,
              ]}
            >
              {props.selectedRewardData.name}
            </Text>
          </View>
          <View style={[styles.rewardcode]}>
            <Text style={[worldxstyles.text, worldxstyles.textBold]}>
              Voucher Code
            </Text>
            <View style={[styles.rewardcodetext, worldxstyles.bordered]}>
              <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                {code}
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={[
                  worldxstyles.text,
                  worldxstyles.textBold,
                  {
                    borderStyle: "solid",
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                  },
                ]}
              >
                Copy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableShadowButton
          style={[styles.button]}
          containerStyle={[styles.buttonShadow]}
          onPress={() => props.handleClose(false)}
        >
          <Text style={[worldxstyles.text, worldxstyles.textBold]}>CLOSE</Text>
        </TouchableShadowButton>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  rewardelement: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    padding: "1rem",
    marginVertical: "0.5rem",
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  rewarddetails: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",

    padding: "0.5rem",
  },
  rewardlogo: {
    width: "5rem",
    height: "5rem",
    aspectRatio: 1,
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  button: {
    paddingVertical: "0.25rem",
    paddingHorizontal: "1rem",
  },
  buttonShadow: {
    marginVertical: "1rem",
    marginHorizontal: "1rem",
  },
  confirmmodal: {
    width: "100%",
    padding: "1rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  rewardText: { marginHorizontal: "1rem" },
  rewardVoucherText: { marginVertical: "1rem" },
  rewardmodal: {
    width: "100%",
    padding: "1rem",
    justifyContent: "center",

    backgroundColor: worldxstyleconstants.backgroundColor,
  },

  modalBackgroundOverlay: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.8,
    position: "absolute",
  },

  rewardcode: {
    marginVertical: "1rem",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rewardcodetext: {
    padding: "0.5rem",
    backgroundColor: worldxstyleconstants.backgroundColor,
    marginHorizontal: "0.5rem",
  },
});

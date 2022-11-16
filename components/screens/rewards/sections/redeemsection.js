import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../../stylesheets/worldxstylesheet";
import { TouchableShadowButton } from "../../../utility/touchable/touchableshadowbutton";
import { addToReward } from "../../../../features/worldxpointsslice";

export const RedeemSection = React.memo((props) => {
  const redeemArray = useRef(useSelector((state) => state.worldxpoints.redeem));
  const [isShowRedeemModal, setIsShowRedeemModal] = useState(false);
  const [selectedRedeemData, setSelectedRedeemData] = useState({});
  const dispatch = useDispatch();

  const renderRedeemItem = useCallback(({ item }) => {
    return (
      <RedeemElement
        item={item}
        handleSelectedRedeemData={setSelectedRedeemData}
        handleModalVisible={setIsShowRedeemModal}
      />
    );
  }, []);

  return (
    <Animatable.View
      style={[props.style, { flex: 1 }]}
      animation={"fadeInUp"}
      duration={500}
    >
      <FlatList
        style={[props.style, { flex: 1 }]}
        showsVerticalScrollIndicator={false}
        data={redeemArray.current}
        renderItem={renderRedeemItem}
      />
      <RedeemConfirmModal
        isVisible={isShowRedeemModal}
        handleClose={setIsShowRedeemModal}
        redeemData={selectedRedeemData}
      />
    </Animatable.View>
  );
});

const RedeemElement = React.memo((props) => {
  return (
    <TouchableOpacity
      style={[styles.redeemElement, worldxstyles.bordered]}
      onPress={() => {
        props.handleSelectedRedeemData({
          name: "$" + props.item.dollar + " " + props.item.name + " Voucher",
          points: props.item.points,
          icon: props.item.icon,
        });
        props.handleModalVisible(true);
      }}
    >
      <Image
        source={props.item.icon}
        style={[styles.redeemlogo, worldxstyles.bordered]}
      />

      <View style={[styles.redeemElementDetails]}>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textSmallMedium,
            worldxstyles.textBold,
            {
              alignSelf: "flex-start",
            },
          ]}
        >
          ${props.item.dollar} {props.item.name} Voucher
        </Text>
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textBold,
            {
              alignSelf: "flex-end",
            },
          ]}
        >
          {props.item.points} points
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export const RedeemConfirmModal = (props) => {
  const points = useSelector((state) => state.worldxpoints.totalPoints);
  const [isAbleToBuy, setIsAbleToBuy] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (points < props.redeemData.points) {
      setIsAbleToBuy(false);
    } else {
      setIsAbleToBuy(true);
    }
  }, [props.redeemData]);

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
      <View style={[{ flex: 1, justifyContent: "center" }]}>
        <View
          style={[styles.modalBackgroundOverlay, StyleSheet.absoluteFill]}
        ></View>
        <View style={[worldxstyles.bordered, styles.modal]}>
          <Image
            source={props.redeemData.icon}
            style={[styles.redeemlogo, worldxstyles.bordered]}
          />
          <Text style={[worldxstyles.text, styles.modalText]}>
            You are about to redeem {props.redeemData.name}
          </Text>
          <Text
            style={[
              worldxstyles.text,
              worldxstyles.textBold,
              styles.modalText,
              { color: isAbleToBuy ? "white" : "red" },
            ]}
          >
            {isAbleToBuy ? "Confirm redeem?" : "Not enough points!"}
          </Text>

          <View style={[worldxstyles.flexRow]}>
            {isAbleToBuy ? (
              <TouchableShadowButton
                style={[styles.button]}
                onPress={() =>
                  dispatch(
                    addToReward({
                      name: props.redeemData.name,
                      icon: props.redeemData.icon,
                    })
                  )
                }
              >
                <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                  REDEEM
                </Text>
              </TouchableShadowButton>
            ) : null}

            <TouchableShadowButton
              style={[styles.button]}
              containerStyle={[styles.buttonShadow]}
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

const styles = EStyleSheet.create({
  redeemElement: {
    flexDirection: "row",
    width: "100%",
    padding: "1rem",
    marginVertical: "0.5rem",
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  redeemElementDetails: {
    justifyContent: "space-around",
    flex: 1,
    paddingHorizontal: "0.5rem",
  },
  redeemlogo: {
    width: "5rem",
    height: "5rem",
    aspectRatio: 1,
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  modal: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: worldxstyleconstants.backgroundColor,
    padding: "1rem",
  },
  modalBackgroundOverlay: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.8,
    position: "absolute",
  },
  button: {
    padding: "0.5rem",
  },
  buttonShadow: {
    marginHorizontal: "1rem",
  },
  modalText: {
    margin: "1rem",
  },
});

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../../stylesheets/worldxstylesheet";
import { TouchableShadowButton } from "../../../utility/touchable/touchableshadowbutton";

export const RedeemSection = React.memo((props) => {
  const redeemArray = useRef(useSelector((state) => state.worldxpoints.redeem));
  const dispatch = useDispatch();

  const renderRedeemItem = useCallback(({ item }) => {
    return (
      <RedeemElement
        item={item}
        handleSelectedRedeemData={props.handleSelectedRedeemData}
        handleModalVisible={props.handleModalVisible}
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
    </Animatable.View>
  );
});

const RedeemElement = React.memo((props) => {
  return (
    <TouchableOpacity
      style={[styles.redeemElement, worldxstyles.bordered]}
      onPress={() => {
        props.handleSelectedRedeemData({
          name: props.item.name,
          points: props.item.points,
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
  return (
    <Modal
      style={[styles.modal]}
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.handleClose(false);
      }}
      statusBarTranslucent={true}
    >
      <Text style={[worldxstyles.text, worldxstyles.textSmallMedium]}>
        sdfdsfsdf
      </Text>
      <TouchableShadowButton onPress={() => props.handleClose(false)}>
        <Text style={[worldxstyles.text, worldxstyles.textBold]}> CLOSE </Text>
      </TouchableShadowButton>
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

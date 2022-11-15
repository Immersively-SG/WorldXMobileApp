import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import * as Animatable from "react-native-animatable";
import { RedeemSection, RedeemConfirmModal } from "./sections/redeemsection.js";
import React, { useState } from "react";
import { View, Text } from "react-native";
const titleArray = ["Rewards", "Your Rewards", "Points Log"];

export const RewardsPage = (props) => {
  const [isShowRedeemModal, setIsShowRedeemModal] = useState(false);
  const [selectedRedeemData, setSelectedRedeemData] = useState({});

  const PageSwitcher = (index) => {
    switch (index) {
      case 0: {
        return (
          <RedeemSection
            handleSelectedRedeemData={setSelectedRedeemData}
            handleModalVisible={setIsShowRedeemModal}
          />
        );
      }

      case 1: {
        return <RewardsSection />;
      }

      case 2: {
        return <PointsLogSection />;
      }

      default:
      //do nothing
    }
  };

  return (
    <View style={[props.style, styles.section]}>
      <Text
        style={[
          styles.title,
          worldxstyles.text,
          worldxstyles.textBold,
          worldxstyles.textSmallMedium,
        ]}
      >
        {titleArray[props.pageIndex]}
      </Text>
      {PageSwitcher(props.pageIndex)}
      <RedeemConfirmModal
        isVisible={isShowRedeemModal}
        handleClose={setIsShowRedeemModal}
      />
    </View>
  );
};

const RewardsSection = (props) => {
  return (
    <Animatable.View style={props.style} animation={"fadeInUp"} duration={500}>
      <Text style={[worldxstyles.text]}>sadasdadsadsad</Text>
    </Animatable.View>
  );
};

const PointsLogSection = (props) => {
  return (
    <Animatable.View style={props.style} animation={"fadeInUp"} duration={500}>
      <Text style={[worldxstyles.text]}>asdsadsadsadsa</Text>
    </Animatable.View>
  );
};

const styles = EStyleSheet.create({
  section: { paddingHorizontal: "1rem", flex: 1 },
  title: {
    marginBottom: "1rem",
  },
});

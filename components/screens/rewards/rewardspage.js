import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import * as Animatable from "react-native-animatable";

import { useSelector } from "react-redux";
import { useRef, useState } from "react";

import { Shadow } from "react-native-shadow-2";

const titleArray = ["Rewards", "Your Rewards", "Points Log"];

export const RewardsPage = (props) => {
  const [isShowRedeemModal, setIsShowRedeemModal] = useState(false);
  const [selectedRedeemData, setSelectedRedeemData] = useState({});

  const PageSwitcher = (index) => {
    switch (index) {
      case 0: {
        return <RedeemSection />;
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

  const RedeemSection = (props) => {
    const redeemArray = useRef(
      useSelector((state) => state.worldxpoints.redeem)
    );

    return (
      <Animatable.View
        style={[props.style, { flex: 1 }]}
        animation={"fadeInUp"}
        duration={500}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={redeemArray.current}
          renderItem={renderRedeemItem}
        />
      </Animatable.View>
    );
  };

  const RewardsSection = (props) => {
    return (
      <Animatable.View
        style={props.style}
        animation={"fadeInUp"}
        duration={500}
      >
        <Text style={[worldxstyles.text]}>sadasdadsadsad</Text>
      </Animatable.View>
    );
  };

  const PointsLogSection = (props) => {
    return (
      <Animatable.View
        style={props.style}
        animation={"fadeInUp"}
        duration={500}
      >
        <Text style={[worldxstyles.text]}>asdsadsadsadsa</Text>
      </Animatable.View>
    );
  };

  const RedeemConfirmModal = (props) => {
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.handleClose(false);
      }}
      statusBarTranslucent={true}
    ></Modal>;
  };

  const renderRedeemItem = ({ item }) => {
    return (
      <Shadow
        distance={2}
        startColor={"#000000"}
        endColor={"#00000000"}
        offset={[0, 5]}
        containerStyle={[styles.redeemElementShadowContainer]}
      >
        <TouchableOpacity style={[styles.redeemElement, worldxstyles.bordered]}>
          <Shadow
            distance={1}
            startColor={"#000000"}
            endColor={"#00000000"}
            offset={[0, 5]}
          >
            <Image
              source={item.icon}
              style={[styles.redeemlogo, worldxstyles.bordered]}
            />
          </Shadow>
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
              ${item.dollar} {item.name} Voucher
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
              {item.points} points
            </Text>
          </View>
        </TouchableOpacity>
      </Shadow>
    );
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

const styles = EStyleSheet.create({
  section: { paddingHorizontal: "1rem", flex: 1 },
  title: {
    marginBottom: "1rem",
  },
  redeemElementShadowContainer: {
    marginVertical: "0.5rem",
  },
  redeemElement: {
    flexDirection: "row",
    width: "100%",
    padding: "1rem",

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
});

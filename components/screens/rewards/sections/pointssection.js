import { View, Text, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import { worldxstyles } from "../../../../stylesheets/worldxstylesheet";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { LinearGradientContainer } from "../../../utility/containers/lineargradient";
import EStyleSheet from "react-native-extended-stylesheet";

export const PointsLogSection = (props) => {
  const pointsLog = useSelector((state) => {
    return state.worldxpoints.pointsLog;
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <LinearGradientContainer
        colors={["transparent", "#000000"]}
        style={[worldxstyles.flexRow, styles.pointselementcontainer]}
      >
        <View style={[worldxstyles.flexRow, styles.pointselement]}>
          <Text style={[worldxstyles.text]}>{item.name}</Text>
          <Text
            style={[
              worldxstyles.text,
              { color: item.points < 0 ? "red" : "green" },
            ]}
          >
            {item.points < 0
              ? "- " + Math.abs(item.points)
              : "+ " + Math.abs(item.points)}
          </Text>
        </View>
      </LinearGradientContainer>
    );
  }, []);

  return (
    <Animatable.View
      style={[props.style, { flex: 1 }]}
      animation={"fadeInUp"}
      duration={500}
      useNativeDriver={true}
    >
      <FlatList
        style={[{ flex: 1 }]}
        contentContainerStyle={{ justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        data={pointsLog}
        renderItem={renderItem}
      />
    </Animatable.View>
  );
};

const styles = EStyleSheet.create({
  pointselementcontainer: {
    width: "100%",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    borderRadius: "0.3rem",
  },
  pointselement: {
    width: "100%",
    justifyContent: "space-between",
  },
});

import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";

//ICONS
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const RewardsTabs = (props) => {
  return (
    <View style={[props.style, styles.tabs]}>
      <TouchableOpacity
        style={[worldxstyles.bordered, styles.tabelement]}
        onPress={() => {
          props.handleTabClicked(0);
        }}
      >
        <Entypo name="swap" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Redeem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[worldxstyles.bordered, styles.tabelement]}
        onPress={() => {
          props.handleTabClicked(1);
        }}
      >
        <SimpleLineIcons name="present" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Rewards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[worldxstyles.bordered, styles.tabelement]}
        onPress={() => {
          props.handleTabClicked(2);
        }}
      >
        <FontAwesome name="book" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Points Log</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  tabs: {
    alignSelf: "flex-end",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabelement: {
    borderRadius: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    aspectRatio: 2,
  },
  tabstext: {},
});

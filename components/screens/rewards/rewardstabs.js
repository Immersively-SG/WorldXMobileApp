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
      <TouchableOpacity style={[styles.tabelement]}>
        <Entypo name="swap" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Redeem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabelement]}>
        <SimpleLineIcons name="present" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Rewards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabelement]}>
        <FontAwesome name="book" size={24} color="white" />
        <Text style={[worldxstyles.text]}>Points Log</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  tabs: {
    alignSelf: "flex-end",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabelement: {
    ...worldxstyles.bordered,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    aspectRatio: 2,
  },
  tabstext: {},
});

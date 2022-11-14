import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export const PayScreenHeader = (props) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignContent: "flex-end",
        },
        props.style,
      ]}
    >
      <LinearGradient
        style={[
          worldxstyles.flexRow,
          { padding: 5, justifyContent: "space-between" },
        ]}
        colors={["#000000", "transparent"]}
        end={{ x: 1.0, y: 1.0 }}
      >
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textMedium,
            worldxstyles.textBold,
          ]}
        >
          {props.label}
        </Text>

        <Feather name="info" size={30} color="white" />
      </LinearGradient>
      <Text style={[worldxstyles.text]}>
        {props.isRenderSubtext &&
          "Earn cashback for all your purchases when you have an active cashbackcard."}
      </Text>
    </View>
  );
};

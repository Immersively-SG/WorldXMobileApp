import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

export const TouchableClipboard = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        Clipboard.setString(props.text);
      }}
    >
      <View style={[{ flex: 1 }, styles.container]}>
        <View
          style={[
            { flex: 1, alignItems: "center", width: "70%" },
            styles.flexRow,
          ]}
        >
          <Text numberOfLines={1} style={[styles.text, { textAlign: "right" }]}>
            {props.text}
          </Text>
          <View
            style={[
              styles.bordered,
              {
                height: "30%",
                width: "30%",
                aspectRatio: 1,
                borderWidth: 1,
                borderRadius: 10,
              },
            ]}
          >
            <Image
              source={require("../../../assets/WorldX/Icons/UI/Clipboard.png")}
              style={[
                {
                  height: "100%",
                  width: "100%",
                  aspectRatio: 1,
                  resizeMethod: "contain",
                },
              ]}
            ></Image>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bordered: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  flexRow: {
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    margin: 20,
  },
});

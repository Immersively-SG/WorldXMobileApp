import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { worldxstyleconstants } from "../../../stylesheets/worldxstylesheet";

export const TouchableIconLink = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.icon,
        {
          alignItems: "center",
          backgroundColor: worldxstyleconstants.backgroundColor,
          aspectRatio: 1,
        },
      ]}
      activeOpacity={0.5}
      onPress={() => {
        props.navigation.push(props.screenName);
      }}
    >
      <Image source={props.image} style={styles.image}></Image>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    resizeMode: "stretch",
  },
  text: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

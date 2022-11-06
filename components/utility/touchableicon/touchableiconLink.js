import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";

export const TouchableIconLink = (props) => {
  return (
    <TouchableOpacity
      style={styles.icon}
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
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "stretch",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

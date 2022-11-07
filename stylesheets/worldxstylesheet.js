import { StyleSheet } from "react-native";
export const worldxstyleconstants = {
  lineColor: "#8f4dcf",
};

export const worldxstyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    margin: 20,
  },
  bordered: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: worldxstyleconstants.lineColor,
  },
  flexRow: {
    flexDirection: "row",
  },
  alignBottom: {
    textAlignVertical: "bottom",
  },
  text: {
    color: "#ffffff",
  },
  textMedium: {
    fontSize: 20,
  },
  textBig: {
    fontSize: 50,
  },
  textBold: {
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMethod: "resize",
    resizeMode: "contain",
  },
});
import { StyleSheet } from "react-native";
export const worldxstyleconstants = {
  lineColor: "#8f4dcf",
  backgroundColor: "#1c0738",
};

export const worldxstyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    margin: 20,
  },
  bordered: {
    borderStyle: "solid",
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
    fontSize: 30,
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

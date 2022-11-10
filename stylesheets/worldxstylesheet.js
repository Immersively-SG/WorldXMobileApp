import EStyleSheet from "react-native-extended-stylesheet";
export const worldxstyleconstants = {
  lineColor: "#8f4dcf",
  backgroundColor: "#1c0738",
};

export const worldxstyles = EStyleSheet.create({
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
  textSmallMedium: {
    fontSize: "1.2rem",
  },
  textMedium: {
    fontSize: "2rem",
  },
  textBig: {
    fontSize: "3rem",
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

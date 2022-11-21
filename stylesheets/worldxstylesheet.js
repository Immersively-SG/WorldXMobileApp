import EStyleSheet from "react-native-extended-stylesheet";
export const worldxstyleconstants = {
  lineColor: "#8f4dcf",
  disabledLineColor: "rgba(77, 51, 102,0.5)",
  backgroundColor: "#1c043c",
  disabledColor: "rgba(28, 4, 60, 0.3)",
};

export const worldxstyles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
  bordered: {
    borderStyle: "solid",
    borderRadius: "1rem",
    borderWidth: "0.1rem",
    borderColor: worldxstyleconstants.lineColor,
  },
  flexRow: {
    flexDirection: "row",
  },
  alignBottom: {
    textAlignVertical: "bottom",
  },
  text: {
    fontFamily: "MPLUS1p_400Regular",
    color: "#ffffff",
  },
  textHeader: {
    fontFamily: "MPLUS1p_400Regular",
    color: "#ffffff",
  },

  textVerySmall: {
    fontSize: "0.7rem",
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
    fontFamily: "MPLUS1p_700Bold",
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

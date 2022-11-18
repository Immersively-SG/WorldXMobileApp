import EStyleSheet from "react-native-extended-stylesheet";
import { InfoToast } from "react-native-toast-message";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  info: (props) => (
    <InfoToast
      {...props}
      style={[styles.info, worldxstyles.bordered]}
      contentContainerStyle={[styles.contentContainer]}
      text1Style={[worldxstyles.text, styles.text1]}
    />
  ),
};

const styles = EStyleSheet.create({
  info: {
    borderColor: worldxstyleconstants.backgroundColor,
    backgroundColor: worldxstyleconstants.backgroundColor,
    overflow: "hidden",
    borderLeftWidth: "0.1rem",
  },
  contentContainer: {
    paddingHorizontal: "1rem",
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  text1: {
    fontSize: "1rem",
  },
});

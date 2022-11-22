import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  worldxstyles,
  worldxstyleconstants,
} from "../../stylesheets/worldxstylesheet";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const BottomNavigator = (props) => {
  const navigation = useNavigation();
  return (
    props.currentScreen != "Home" &&
    props.currentScreen != "SplashScreen" &&
    props.navStateReady == true && (
      <View style={styles.bottomTab}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="home" size={30} color="white" />
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-evenly",
  },
});

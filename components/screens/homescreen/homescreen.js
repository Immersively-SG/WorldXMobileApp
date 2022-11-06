import {
  Text,
  View,
  BackHandler,
  StyleSheet,
  Image,
  FlatList,
  PixelRatio,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MenuIconsDataArray } from "./homescreenmenudata";
import { useEffect } from "react";
import { WorldXLogo } from "../../utility/backgroundimage/logos";
import { TouchableIconLink } from "../../utility/touchableicon/touchableiconLink";

export const HomeScreen = ({ navigation }) => {
  const FADE_IN_DURATION = 1000;

  //if user presses back on this screen, exit app
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        BackHandler.exitApp();
      }),
    [navigation]
  );

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      data={MenuIconsDataArray}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <Animatable.View
            useNativeDriver={true}
            animation="fadeInUp"
            duration={FADE_IN_DURATION}
            delay={(index + 1) * 300 + FADE_IN_DURATION}
            style={[
              { flex: 1, justifyContent: "center" },
              styles.container,
              styles.bordered,
            ]}
          >
            <TouchableIconLink
              image={item.image}
              label={item.name}
              screenName={item.screenName}
              navigation={navigation}
            />
          </Animatable.View>
        );
      }}
      ListHeaderComponentStyle={{
        flex: 1,
      }}
      ListHeaderComponent={
        <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
          {/*Logo and title --start*/}
          <Animatable.View
            useNativeDriver={true}
            animation="fadeInUp"
            duration={2000}
            style={[
              { flex: 1, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Image
              source={WorldXLogo}
              style={[
                {
                  height: 300,
                  resizeMethod: "resize",
                  resizeMode: "contain",
                },
              ]}
            ></Image>
            <Text style={[styles.text, styles.textBold, styles.textCenter]}>
              Gateway App
            </Text>
          </Animatable.View>
          {/*Logo and title --end*/}
          {/*Profile --start*/}
          <Animatable.View
            useNativeDriver={true}
            animation="fadeInUp"
            duration={FADE_IN_DURATION}
            delay={1000}
            style={[
              { flex: 1 },
              styles.container,

              { marginBottom: 0, justifyContent: "flex-end" },
            ]}
          >
            <Animatable.Text
              useNativeDriver={true}
              style={[
                styles.text,
                styles.textBold,
                {
                  alignSelf: "stretch",
                  borderStyle: "solid",
                  marginBottom: 10,
                },
              ]}
            >
              Welcome User,
            </Animatable.Text>
            <View
              style={[
                { flex: 1, alignSelf: "stretch", alignItems: "center" },
                styles.bordered,
                styles.flexRow,
              ]}
            >
              <View style={[{ flex: 1 }, styles.container]}>
                <View style={[{ flex: 1 }]}>
                  <View style={[{ aspectRatio: 1 }, styles.bordered]}>
                    <Image
                      source={require("../../../assets/WorldX/Icons/passport.png")}
                      style={{
                        height: 100,
                        width: 100,
                        resizeMode: "contain",
                        aspectRatio: 1,
                      }}
                    ></Image>
                  </View>
                  <View style={[styles.flexRow, { alignSelf: "flex-start" }]}>
                    <Text style={[styles.text, styles.alignBottom]}>Lv</Text>
                    <Text style={[styles.text, styles.textMedium]}>10</Text>
                  </View>
                </View>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[styles.text, styles.textBig, styles.textBold]}>
                  200
                </Text>
                <Text style={styles.text}>LoyaltyPoints</Text>
              </View>
            </View>
          </Animatable.View>
          {/*Profile --end*/}
        </View>
      }
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    margin: 20,
  },
  bordered: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ffffff",
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
    fontSize: 30,
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

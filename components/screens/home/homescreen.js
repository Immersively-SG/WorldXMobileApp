import {
  Text,
  View,
  BackHandler,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MenuIconsDataArray } from "./homescreenmenudata";
import { useEffect } from "react";
import { WorldXLogo } from "../../utility/backgroundimage/logos";
import { TouchableIconLink } from "../../utility/touchable/touchableiconLink";
import * as Clipboard from "expo-clipboard";
import { worldxstyles } from "../../../stylesheets/worldxstylesheet";
import { RandomRangeInt } from "../../utility/math/math";

export const HomeScreen = ({ navigation }) => {
  const FADE_IN_DURATION = 1000;
  const METAMASK_ID = "sdf56adf567ag5a5";

  //if user presses back on this screen, exit app
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        BackHandler.exitApp();
      }),
    [navigation]
  );

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(METAMASK_ID);
  };

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
              {
                flex: 1,
                justifyContent: "center",
                aspectRatio: 1,
              },
              worldxstyles.container,
              worldxstyles.bordered,
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
            />

            <Text
              style={[
                worldxstyles.text,
                worldxstyles.textBold,
                worldxstyles.textCenter,
              ]}
            >
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
              worldxstyles.container,

              { marginBottom: 0, justifyContent: "flex-end" },
            ]}
          >
            <Animatable.Text
              useNativeDriver={true}
              style={[
                worldxstyles.text,
                worldxstyles.textBold,
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
                worldxstyles.bordered,
                worldxstyles.flexRow,
              ]}
            >
              <View style={[{ flex: 1 }, worldxstyles.container]}>
                <View style={[{ flex: 1 }]}>
                  <View
                    style={[
                      { aspectRatio: 1, height: "70%", width: "70%" },
                      worldxstyles.bordered,
                    ]}
                  >
                    <Image
                      source={require("../../../assets/WorldX/Icons/passport.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "contain",
                        aspectRatio: 1,
                      }}
                    ></Image>
                  </View>
                  <View
                    style={[worldxstyles.flexRow, { alignSelf: "flex-start" }]}
                  >
                    <Text style={[worldxstyles.text, worldxstyles.alignBottom]}>
                      Lv
                    </Text>
                    <Text style={[worldxstyles.text, worldxstyles.textMedium]}>
                      {RandomRangeInt(1, 50)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[{ flex: 1 }, worldxstyles.container]}>
                <View
                  style={[
                    { flex: 1, alignItems: "center", width: "70%" },
                    worldxstyles.flexRow,
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={[worldxstyles.text, { textAlign: "right" }]}
                  >
                    {METAMASK_ID}
                  </Text>
                  <TouchableOpacity
                    style={[
                      worldxstyles.bordered,
                      {
                        height: "30%",
                        width: "30%",
                        aspectRatio: 1,
                        borderWidth: 1,
                        borderRadius: 10,
                      },
                    ]}
                    onPress={copyToClipboard}
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
                  </TouchableOpacity>
                </View>
                <View style={[{ flex: 1 }]}>
                  <Text
                    style={[
                      worldxstyles.text,
                      worldxstyles.textBig,
                      worldxstyles.textBold,
                    ]}
                  >
                    {RandomRangeInt(100, 1000)}
                  </Text>
                  <Text style={worldxstyles.text}>Loyalty Points</Text>
                </View>
              </View>
            </View>
          </Animatable.View>
          {/*Profile --end*/}
        </View>
      }
    ></FlatList>
  );
};

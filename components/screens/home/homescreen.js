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
import { useEffect, useRef, useState } from "react";
import { WorldXLogo } from "../../utility/backgroundimage/logos";
import { TouchableIconLink } from "../../utility/touchable/touchableiconLink";
import * as Clipboard from "expo-clipboard";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import AnimatedNumber from "react-native-animated-numbers";
import { useIsFocused } from "@react-navigation/native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const HomeScreen = ({ navigation }) => {
  const FADE_IN_DURATION = 1000;

  const worldxpoints = useSelector((state) => {
    return state.worldxpoints;
  });

  const isFocused = useIsFocused();

  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  //if user presses back on this screen, exit app
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        BackHandler.exitApp();
      }),
    [navigation]
  );

  useEffect(() => {
    setPoints(worldxpoints.totalPoints);
    setProgress(
      parseFloat(worldxpoints.currentExp) /
        parseFloat(worldxpoints.expToNextLevel)
    );
  }, [isFocused]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(worldxpoints.userid);
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
                overflow: "hidden",
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
            <Image source={WorldXLogo} style={[styles.logoHeader]} />

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
                styles.profileCard,

                worldxstyles.bordered,
                worldxstyles.flexRow,
              ]}
            >
              <View style={[{ flex: 1 }, worldxstyles.container]}>
                <View style={[{ flex: 1 }]}>
                  <Image
                    source={require("../../../assets/WorldX/Icons/character_hud.png")}
                    style={[
                      worldxstyles.bordered,
                      {
                        height: "70%",
                        width: "70%",
                        aspectRatio: 1,
                        resizeMode: "cover",
                      },
                    ]}
                  />

                  <View style={[worldxstyles.flexRow, { alignSelf: "center" }]}>
                    <Text style={[worldxstyles.text, worldxstyles.alignBottom]}>
                      Lv
                    </Text>
                    <Text style={[worldxstyles.text, worldxstyles.textMedium]}>
                      {worldxpoints.totalLevel}
                    </Text>
                  </View>
                  <Progress.Bar
                    style={[styles.progressbar]}
                    progress={progress}
                    width={null}
                    useNativeDriver={true}
                    color={"white"}
                    borderColor={worldxstyleconstants.lineColor}
                    aniamtionType={"decay"}
                  ></Progress.Bar>
                  <Text
                    style={[
                      worldxstyles.text,
                      worldxstyles.textVerySmall,
                      { textAlign: "center" },
                    ]}
                  >
                    {parseInt(worldxpoints.currentExp)}/
                    {parseInt(worldxpoints.expToNextLevel)}
                  </Text>
                </View>
              </View>
              <View style={[{ flex: 1 }, worldxstyles.container]}>
                <Text
                  numberOfLines={1}
                  style={[worldxstyles.text, { textAlign: "center" }]}
                >
                  Wallet Address
                </Text>
                <View
                  style={[
                    { flex: 1, alignItems: "center", width: "70%" },
                    worldxstyles.flexRow,
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      worldxstyles.text,
                      styles.walletid,
                      { textAlign: "right" },
                    ]}
                  >
                    {worldxpoints.userid}
                  </Text>
                  <TouchableOpacity
                    style={[worldxstyles.bordered, styles.clipboard]}
                    onPress={() => {
                      Toast.show({
                        type: "info",
                        text1: "MetaMask ID copied to clipboard!",
                      });
                      copyToClipboard();
                    }}
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
                <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
                  <AnimatedNumber
                    fontStyle={[
                      worldxstyles.text,
                      worldxstyles.textBig,
                      worldxstyles.textBold,
                    ]}
                    animateToNumber={points}
                  />

                  <Text style={[worldxstyles.text, { textAlign: "center" }]}>
                    Loyalty Points
                  </Text>
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

const styles = EStyleSheet.create({
  logoHeader: {
    height: "15rem",
    resizeMethod: "resize",
    resizeMode: "contain",
  },
  clipboard: {
    height: "2rem",
    width: "2rem",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 10,
  },
  profileCard: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: worldxstyleconstants.backgroundColor,
    padding: "1rem",
  },
  progressbar: {
    marginVertical: "0.2rem",
  },
  walletid: {
    paddingLeft: "0.5rem",
  },
});

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { Emitter } from "react-native-particles";
import { useState, useEffect, createRef, useRef } from "react";
import MapView, { Circle, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import {
  isPointWithinRadius,
  findNearest,
  getCompassDirection,
  getDistance,
} from "geolib";
import * as Animatable from "react-native-animatable";
import { RandomString } from "./../../utility/math/math";
import AnimatedNumbers from "react-native-animated-numbers";
import { LinearGradient } from "expo-linear-gradient";
import { Particle } from "../../utility/particle/particle";
import EStyleSheet from "react-native-extended-stylesheet";
import { TouchableShadowButton } from "../../utility/touchable/touchableshadowbutton";
import { useDispatch } from "react-redux";
import { addToPointsLog } from "../../../features/worldxpointsslice";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const BeThereAndEarnScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [expCirclesArray, setExpCirclesArray] = useState(null);
  const expCirclesDataArray = useRef(null);
  const isInExpCircle = useRef(false);
  const [nearestExpCircle, setNearestExpCircle] = useState(null);
  const currentExpCircle = useRef(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  const dispatch = useDispatch();

  const mapRef = createRef();
  const goToMyLocation = async (_latitude, _longitude) => {
    mapRef.current.animateCamera({
      center: {
        latitude: _latitude,
        longitude: _longitude,
      },

      zoom: 18,
    });
  };

  const updateLocation = async () => {
    //fetch location updates
    const locationPromise = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 10,
    });

    const location = await locationPromise;

    setLocation(location);

    // const geocodePromise = Location.reverseGeocodeAsync(location.coords);
    // setGeocode(geocode);
  };

  const handleCirclePoints = () => {
    if (isInExpCircle.current && currentExpCircle.current != null) {
      var circlesArray = expCirclesDataArray.current;
      circlesArray[currentExpCircle.current.index].points += 10;
      expCirclesDataArray.current = circlesArray;
      setCurrentPoints(circlesArray[currentExpCircle.current.index].points);
    }
  };

  //////////ON MOUNT/////////////////
  useEffect(() => {
    var interval;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      //fetch location updates
      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
      });

      const [location] = await Promise.all([locationPromise]);

      setLocation(location);

      const _expCircleDataArray = GenerateExpCirclesData({
        userlatlong: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        numCircles: 5,
        minRadius: 20,
        maxRadius: 30,
        minDistance: -0.00075,
        maxDistance: 0.00075,
        // minDistance: 0,
        // maxDistance: 0,
      });

      //generate exp circles data
      expCirclesDataArray.current = _expCircleDataArray;

      setExpCirclesArray(() => {
        return _expCircleDataArray.map((element, index) => {
          return (
            <Circle
              key={index}
              center={{
                latitude: element.latitude,
                longitude: element.longitude,
              }}
              radius={element.radius}
              strokeWidth={2}
              strokeColor="#c681f5"
              fillColor="rgba(74,29,119,0.5)"
            />
          );
        });
      });

      interval = setInterval(() => {
        updateLocation();
        handleCirclePoints();
      }, 1000);
    })();
    return () => {
      clearInterval(interval);
    };
  }, []);

  //everytime the location changes
  useEffect(() => {
    if (location == null) return;

    //check if user is in exp circle
    var isUserInAnyCircle = false;
    expCirclesDataArray.current?.forEach((element) => {
      if (
        isPointWithinRadius(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          element.radius
        )
      ) {
        currentExpCircle.current = element;
        isUserInAnyCircle = true;
        return;
      }
    });

    isInExpCircle.current = isUserInAnyCircle;
    if (!isUserInAnyCircle) currentExpCircle.current = null;

    if (expCirclesDataArray.current == null) return;
    //calculate details to nearest exp circle
    const nearestCirclePoint = findNearest(
      location.coords,
      expCirclesDataArray.current.map((element) => {
        return { latitude: element.latitude, longitude: element.longitude };
      })
    );
    const directionToCircle = getCompassDirection(
      location.coords,
      nearestCirclePoint
    );

    const distanceToCircle = getDistance(location.coords, nearestCirclePoint);

    setNearestExpCircle({
      point: nearestCirclePoint,
      direction: directionToCircle,
      distance: distanceToCircle,
    });

    //animate map to go to point
    goToMyLocation(location.coords.latitude, location.coords.longitude);
  }, [location]);

  return (
    <Animatable.View
      useNativeDriver={true}
      animation="fadeInUp"
      duration={1000}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <LinearGradient
        style={[styles.header]}
        colors={["#000000", "transparent"]}
        end={{ x: 1.0, y: 1.0 }}
      >
        <Text
          style={[
            worldxstyles.text,
            worldxstyles.textMedium,
            worldxstyles.textBold,
          ]}
        >
          Be there and earn
        </Text>
      </LinearGradient>
      <View style={[styles.container, { flex: 5 }]}>
        <View
          style={[
            styles.mapContainer,
            styles.container,
            worldxstyles.bordered,
            { flex: 2, overflow: "hidden" },
          ]}
        >
          <MapView
            ref={mapRef}
            style={[styles.mapContainer]}
            customMapStyle={mapsStyle.customMapStyle}
            followsUserLocation={true}
            showsUserLocation={true}
            zoomEnabled={true}
            loadingEnabled={true}
          >
            {expCirclesArray}
            {location && nearestExpCircle && (
              <Polyline
                coordinates={[location.coords, nearestExpCircle.point]}
                strokeColor={worldxstyleconstants.lineColor}
                strokeWidth={6}
              />
            )}
          </MapView>
        </View>
        <View style={[{ width: "100%", flex: 1 }]}>
          {isInExpCircle.current && currentExpCircle.current != null ? (
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View>
                <Emitter
                  numberOfParticles={1}
                  emissionRate={1}
                  interval={0}
                  particleLife={2000}
                  direction={-90}
                  spread={20}
                  speed={15}
                  autoStart={true}
                  infiniteLoop={true}
                  gravity={1}
                >
                  <Particle />
                </Emitter>
              </View>
              {/**************************** */}
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  },
                ]}
              >
                <Text
                  style={[
                    worldxstyles.text,
                    worldxstyles.textBold,
                    worldxstyles.textSmallMedium,
                  ]}
                >
                  You are in a reward location!
                </Text>
                <View
                  style={[
                    {
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    },
                    worldxstyles.bordered,
                    worldxstyles.flexRow,
                    styles.pointsContainer,
                  ]}
                >
                  <View
                    style={[worldxstyles.flexRow, { alignItems: "center" }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(currentExpCircle.current.url);
                      }}
                    >
                      <Image
                        source={require("../../../assets/WorldX/Logo/grablogo.png")}
                        style={[worldxstyles.bordered, styles.merchantlogo]}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        worldxstyles.text,
                        worldxstyles.textBold,
                        worldxstyles.textSmallMedium,
                        { textAlign: "center" },
                      ]}
                    >
                      {currentExpCircle.current.name}
                      {"\n"}Mall
                    </Text>
                  </View>
                  <View style={[{ alignItems: "center" }]}>
                    <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                      Collecting Points
                    </Text>
                    <AnimatedNumbers
                      fontStyle={[
                        worldxstyles.text,
                        worldxstyles.textBold,
                        worldxstyles.textSmallMedium,
                      ]}
                      animateToNumber={currentPoints}
                      animationDuration={500}
                    />
                    <TouchableShadowButton
                      style={[styles.collectButton]}
                      onPress={() => {
                        dispatch(
                          addToPointsLog({
                            name: currentExpCircle.current.name + " Mall",
                            points: currentPoints,
                          })
                        );
                        Toast.show({
                          type: "info",
                          text1:
                            "You have collected " +
                            currentPoints +
                            " from " +
                            currentExpCircle.current.name +
                            "Mall!",
                        });
                        expCirclesDataArray.current[
                          currentExpCircle.current.index
                        ].points = 0;
                      }}
                    >
                      <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                        Collect
                      </Text>
                    </TouchableShadowButton>
                  </View>
                </View>
                <Text style={[worldxstyles.text]}>
                  You will still earn points when the app is minimized.
                </Text>
              </View>
              {/**************************** */}
              <View>
                <Emitter
                  numberOfParticles={1}
                  emissionRate={1}
                  interval={0}
                  particleLife={2000}
                  direction={-90}
                  spread={20}
                  speed={15}
                  autoStart={true}
                  infiniteLoop={true}
                  gravity={1}
                >
                  <Particle />
                </Emitter>
              </View>
            </View>
          ) : (
            nearestExpCircle != null && (
              <View>
                <View
                  style={[worldxstyles.flexRow, styles.notincirclecontainer]}
                >
                  <Text
                    style={[worldxstyles.text, worldxstyles.textSmallMedium]}
                  >
                    {nearestExpCircle.distance}m
                  </Text>
                  <View
                    style={[
                      worldxstyles.bordered,
                      {
                        borderRadius: 10,
                        alignSelf: "flex-end",
                        padding: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        worldxstyles.text,
                        worldxstyles.textSmallMedium,
                        { textAlign: "center", textAlignVertical: "center" },
                      ]}
                    >
                      {nearestExpCircle.direction}
                    </Text>
                  </View>
                </View>
                <Text style={[worldxstyles.text, { textAlign: "center" }]}>
                  Approach a reward circle to earn points!
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    </Animatable.View>
  );
};

//HELPER
const GenerateExpCirclesData = (props) => {
  var circleDataArray = [];
  const userlatlong = props.userlatlong;
  const minRadius = props.minRadius;
  const maxRadius = props.maxRadius;

  for (let i = 0; i < props.numCircles; ++i) {
    const radius =
      Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
    const spawnlatlong = {
      latitude:
        userlatlong.latitude +
        Math.random() * (props.maxDistance - props.minDistance) +
        props.minDistance,
      longitude:
        userlatlong.longitude +
        Math.random() * (props.maxDistance - props.minDistance) +
        props.minDistance,
    };

    circleDataArray.push({
      index: i,
      points: 0,
      latitude: spawnlatlong.latitude,
      longitude: spawnlatlong.longitude,
      radius: radius,
      name: RandomString(6),
      url: "https://www.worldx.co",
    });
  }

  return circleDataArray.map((element) => element);
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  merchantlogo: {
    resizeMethod: "contain",
    height: "5rem",
    width: "5rem",
    aspectRatio: 1,
    backgroundColor: worldxstyleconstants.backgroundColor,
  },
  header: { margin: "1rem" },
  pointsContainer: {
    padding: "1rem",
  },
  notincirclecontainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "1rem",
  },
  collectButton: {
    padding: "0.2rem",
  },
});

const mapsStyle = StyleSheet.create({
  customMapStyle: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ],
});

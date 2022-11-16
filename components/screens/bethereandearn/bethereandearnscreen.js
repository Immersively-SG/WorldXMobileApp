import { View, Text, StyleSheet, Image } from "react-native";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { Emitter } from "react-native-particles";
import { useState, useEffect, createRef } from "react";
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

import { Particle } from "../../utility/particle/particle";
import EStyleSheet from "react-native-extended-stylesheet";

export const BeThereAndEarnScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [expCirclesArray, setExpCirclesArray] = useState(null);
  const [expCirclesDataArray, setExpCirclesDataArray] = useState(null);
  const [isInExpCircle, setIsInExpCircle] = useState(false);
  const [nearestExpCircle, setNearestExpCircle] = useState(null);
  const [currentExpCircle, setCurrentExpCircle] = useState(null);

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

    const [location] = await Promise.all([locationPromise]);

    setLocation(location);

    // const geocodePromise = Location.reverseGeocodeAsync(location.coords);
    // setGeocode(geocode);
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
        // minDistance: -0.00075,
        // maxDistance: 0.00075,
        minDistance: 0,
        maxDistance: 0,
      });

      //generate exp circles data
      setExpCirclesDataArray(_expCircleDataArray);

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
    expCirclesDataArray?.forEach((element) => {
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
        setCurrentExpCircle(element);
        isUserInAnyCircle = true;
        return;
      }
    });

    setIsInExpCircle(isUserInAnyCircle);
    if (!isUserInAnyCircle) setCurrentExpCircle(null);

    if (expCirclesDataArray == null) return;
    //calculate details to nearest exp circle
    const nearestCirclePoint = findNearest(
      location.coords,
      expCirclesDataArray.map((element) => {
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
      <View style={[styles.container, { flex: 1, alignSelf: "stretch" }]}>
        <Image
          source={require("../../../assets/WorldX/Logo/worldxlogo.png")}
          style={{
            aspectRatio: 2,
            resizeMode: "contain",
            alignSelf: "flex-start",
            height: "100%",
            width: "100%",
          }}
        />
      </View>
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
            customMapStyle={styles.customMapStyle}
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
          {isInExpCircle && currentExpCircle ? (
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
                <Text style={[worldxstyles.text, worldxstyles.textBold]}>
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
                  ]}
                >
                  <View
                    style={[worldxstyles.flexRow, { alignItems: "center" }]}
                  >
                    <Image
                      source={require("../../../assets/WorldX/Logo/grablogo.png")}
                      style={[worldxstyles.bordered, styles.merchantlogo]}
                    />
                    <Text
                      style={[
                        worldxstyles.text,
                        worldxstyles.textBold,
                        { textAlign: "center" },
                      ]}
                    >
                      {currentExpCircle.name}
                      {"\n"}Mall
                    </Text>
                  </View>
                  <View>
                    <Text style={[worldxstyles.text, worldxstyles.textBold]}>
                      Collecting Points
                    </Text>
                    <AnimatedNumbers
                      style={[worldxstyles.text, worldxstyles.textBold]}
                      animateToNumber={1000}
                      r
                    />
                  </View>
                </View>
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
            nearestExpCircle && (
              <View>
                <View
                  style={[
                    worldxstyles.flexRow,
                    {
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: 10,
                    },
                  ]}
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

  customMapStyle: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ],
});

import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { Emitter } from "react-native-particles";
import { useState, useEffect, createRef } from "react";
import MapView, { Circle } from "react-native-maps";
import * as Location from "expo-location";
import { isPointWithinRadius } from "geolib";
import * as Animatable from "react-native-animatable";

export const BeThereAndEarnScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [expCirclesArray, setExpCirclesArray] = useState(null);
  const [expCirclesDataArray, setExpCirclesDataArray] = useState(null);
  const [isInExpCircle, setIsInExpCircle] = useState(false);

  const mapRef = createRef();
  const goToMyLocation = async (_latitude, _longitude) => {
    mapRef.current.animateCamera({
      center: {
        latitude: _latitude,
        longitude: _longitude,
      },
      zoom: 20,
    });
  };

  //ON MOUNT
  useEffect(() => {
    var interval;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      //FIRST TIME SET POS
      let location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });

      let geocode = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
      setGeocode(geocode);

      const _expCircleDataArray = GenerateExpCirclesData({
        userlatlong: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        numCircles: 5,
        minRadius: 5,
        maxRadius: 10,
        minDistance: -0.00025,
        maxDistance: 0.00025,
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

      //fetch location updates every interval
      interval = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({
          timeInterval: 5000,
        });

        let geocode = await Location.reverseGeocodeAsync(location.coords);
        setLocation(location);
        setGeocode(geocode);
      }, 1000);
    })();
    return () => clearInterval(interval); //impt! cleanup on unmount
  }, []);

  //eveytime the location change
  useEffect(() => {
    if (location == null) return;

    //animate map to go to point
    goToMyLocation(location.coords.latitude, location.coords.longitude);

    //check if user is in exp circle
    var isUserInAnyCircle = false;
    expCirclesDataArray?.forEach((element) => {
      isUserInAnyCircle |= isPointWithinRadius(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          latitude: element.latitude,
          longitude: element.longitude,
        },
        element.radius
      );
    });
    setIsInExpCircle(isUserInAnyCircle);
  }, [location]);

  return (
    <Animatable.View
      useNativeDriver={true}
      animation="fadeInUp"
      duration={2000}
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
        ></Image>
      </View>
      <View style={[styles.container, { flex: 5 }]}>
        <View
          style={[
            styles.mapContainer,
            styles.container,
            worldxstyles.bordered,
            { flex: 5, overflow: "hidden" },
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
          </MapView>
        </View>
        <View
          style={[
            styles.container,
            styles.container,
            worldxstyles.bordered,
            { width: "80%" },
          ]}
        >
          {/* {geocode != null ? (
            <Text
              style={[
                worldxstyles.text,
                {
                  textAlign: "center",
                  position: "absolute",
                  top: 0,
                  marginTop: 10,
                },
              ]}
            >{`${geocode[0].city} , ${geocode[0].country}, ${geocode[0].district}, ${geocode[0].isoCountryCode}, ${geocode[0].name}, ${geocode[0].postalCode}, ${geocode[0].region}, ${geocode[0].street}, ${geocode[0].streetNumber}, ${geocode[0].subregion}, ${geocode[0].timezone}`}</Text>
          ) : (
            <Text style={worldxstyles.text}>Waiting...</Text>
          )} */}
          {isInExpCircle ? (
            <View
              style={{
                flex: 1,
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <Text style={worldxstyles.text}>You are in a reward circle!</Text>

              {/* <Emitter
                numberOfParticles={50}
                emissionRate={1}
                interval={0}
                particleLife={1500}
                direction={-90}
                spread={45}
                speed={10}
                autoStart={true}
                infiniteLoop={true}
                fromPosition={{ x: 0, y: 0 }}
              >
                <Text style={worldxstyles.text}>Particle</Text>
              </Emitter> */}
            </View>
          ) : (
            <Text style={worldxstyles.text}>
              You are not in a reward circle!
            </Text>
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
      latitude: spawnlatlong.latitude,
      longitude: spawnlatlong.longitude,
      radius: radius,
    });
  }

  return circleDataArray.map((element) => element);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
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

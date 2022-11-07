import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import {
  worldxstyleconstants,
  worldxstyles,
} from "../../../stylesheets/worldxstylesheet";
import { useState, useEffect, createRef } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export const BeThereAndEarnScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [geocode, setGeocode] = useState(null);
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
  useEffect(() => {
    var interval;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      interval = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({
          timeInterval: 5000,
        });

        let geocode = await Location.reverseGeocodeAsync(location.coords);
        setLocation(location);
        setGeocode(geocode);
      }, 2000);
    })();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location == null) return;

    goToMyLocation(location.coords.latitude, location.coords.longitude);
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
        <MapView
          ref={mapRef}
          style={[styles.mapContainer]}
          customMapStyle={styles.customMapStyle}
          followsUserLocation={true}
          showsUserLocation={true}
          zoomEnabled={true}
        />
      </View>
      <View
        style={[
          styles.container,
          styles.container,
          worldxstyles.bordered,

          { flex: 1 },
        ]}
      >
        {geocode != null && (
          <Text
            style={worldxstyles.text}
          >{`${geocode[0].city} , ${geocode[0].country}, ${geocode[0].district}, ${geocode[0].isoCountryCode}, ${geocode[0].name}, ${geocode[0].postalCode}, ${geocode[0].region}, ${geocode[0].street}, ${geocode[0].streetNumber}, ${geocode[0].subregion}, ${geocode[0].timezone}`}</Text>
        )}
      </View>
    </View>
  );
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

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";

const { height, width } = Dimensions.get("screen");

const parkings = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    location: {
      lat: 37.78825,
      lng: -122.4324,
    },
  },
  {
    id: 2,
    title: "Parking 2",
    price: 10,
    rating: 5,
    spots: 30,
    free: 10,
    location: {
      lat: 37.78835,
      lng: -122.4324,
    },
  },
  {
    id: 3,
    title: "Parking 3",
    price: 5,
    rating: 3,
    spots: 10,
    free: 5,
    location: {
      lat: 37.78845,
      lng: -122.4324,
    },
  },
  {
    id: 4,
    title: "Parking 4",
    price: 10,
    rating: 5,
    spots: 30,
    free: 25,
    location: {
      lat: 37.78855,
      lng: -122.4324,
    },
  },
];

const renderHeader = () => {
  return (
    <View style={styles.header}>
      <Text>Header</Text>
    </View>
  );
};

const renderParking = (item) => {
  const [hours, setHours] = useState({});

  return (
    <View key={`parking-${item.id}`} style={styles.parking}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 16, paddingBottom: 10 }}>
          x{item.spots} {item.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              marginRight: 5,
              borderWidth: 0.8,
              borderColor: "gray",
              borderRadius: 6,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            05:00
          </Text>
          <Text style={{ color: "#aaaaaa", fontSize: 16 }}>hrs</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <Text>${item.price}</Text>
          <Text>{item.rating}</Text>
        </View>

        <TouchableWithoutFeedback>
          <View style={styles.buy}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 25 }}>
                ${item.price * 4}
              </Text>
              <Text style={{ color: "#FFF" }}>
                ${item.price}x{hours[item.id]} hrs
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 25 }}>></Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const renderParkings = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      centerContent
      style={styles.parkings}
      showsHorizontalScrollIndicator={false}
    >
      {parkings.map((parking) => renderParking(parking))}
    </ScrollView>
  );
};

const Map = () => {
  return (
    <View style={styles.container}>
      {renderHeader()}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      {renderParkings()}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.5,
    height: 100,
    justifyContent: "center",
  },
  map: {
    flex: 3,
  },
  parkings: {
    right: 0,
    left: 0,
    bottom: 24,
    position: "absolute",
  },
  parking: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 6,
    marginHorizontal: 24,
    width: width - 24 * 2,
    backgroundColor: "#FFF",
  },
  buy: {
    flex: 3,
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-between",
  },
});

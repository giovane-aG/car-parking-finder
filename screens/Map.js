import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Picker,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

const Map = () => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    parkings.forEach((parking) => {
      let pos = parking.id;
      console.log(pos);
      hours[pos] = 1;
    });
    setHours(hours);
  });

  const parkings = [
    {
      id: 0,
      title: "Paid Street Parking",
      price: 5,
      rating: 4.2,
      spots: 20,
      free: 10,
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
    {
      id: 1,
      title: "Parking 2",
      price: 10,
      rating: 5,
      spots: 30,
      free: 10,
      coordinate: {
        latitude: 37.78835,
        longitude: -122.4324,
      },
    },
    {
      id: 2,
      title: "Parking 3",
      price: 5,
      rating: 3,
      spots: 10,
      free: 5,
      coordinate: {
        latitude: 37.78845,
        longitude: -122.4324,
      },
    },
    {
      id: 3,
      title: "Parking 4",
      price: 10,
      rating: 5,
      spots: 30,
      free: 25,
      coordinate: {
        latitude: 37.78855,
        longitude: -122.4324,
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

  const renderParking = (item) => {
    const handleHours = (itemValue, itemIndex) => {
      setHours({ ...hours, [item.id]: itemValue });
    };

    return (
      <View key={`parking-${item.id}`} style={styles.parking}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              paddingBottom: 10,
            }}
          >
            x{item.spots} {item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={hours[item.id]}
              onValueChange={handleHours}
              itemStyle={{
                color: "#000",
                width: 110,
              }}
              style={{
                width: 110,
                color: "#000",
              }}
            >
              <Picker.Item label="01:00" value={1} />
              <Picker.Item label="02:00" value={2} />
              <Picker.Item label="03:00" value={3} />
              <Picker.Item label="04:00" value={4} />
              <Picker.Item label="05:00" value={5} />
            </Picker>

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
              // flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              paddingTop: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Ionicons name="ios-pricetag" size={15} color={"#aaaaaa"} />
              <Text style={{ paddingRight: 5 }}>${item.price}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 8,
              }}
            >
              <Ionicons name="ios-star" size={15} color={"#aaaaaa"} />
              <Text style={{ paddingRight: 5 }}>{item.rating}</Text>
            </View>
          </View>

          <TouchableWithoutFeedback>
            <View style={styles.buy}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingLeft: 5,
                  }}
                >
                  ${item.price * 4}
                </Text>
                <Text style={{ color: "#FFF", fontSize: 13 }}>
                  {item.price}x{hours[item.id]} hrs
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
      >
        {parkings.forEach((parking) => (
          <Marker
            title="Teste"
            description="Essa é uma descrição super legal"
            pinColor="#ff2020"
            coordinate={parking.coordinate}
          />
        ))}
      </MapView>
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
    justifyContent: "space-around",
    padding: 13,
    borderRadius: 6,
    marginHorizontal: 24,
    width: width - 24 * 2,
    backgroundColor: "#fcfcfc",
  },
  buy: {
    flex: 1.5,
    padding: 13,
    borderRadius: 6,
    flexDirection: "row",
    backgroundColor: "#ff2020",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

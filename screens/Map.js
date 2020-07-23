import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Picker,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";

import MapView, { Marker } from "react-native-maps";

import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

const Map = () => {
  const [hours, setHours] = useState([]);
  const [active, setActive] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const setStateActive = (id) => {
    setActive(id);
  };

  useEffect(() => {
    parkings.forEach((parking) => {
      hours[parking.id] = 1;
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
      distance: 2.9,
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
      distance: 4.1,
      coordinate: {
        latitude: 37.78835,
        longitude: -122.4354,
      },
    },
    {
      id: 2,
      title: "Parking 3",
      price: 5,
      rating: 3,
      spots: 10,
      free: 5,
      distance: 3.2,
      coordinate: {
        latitude: 37.7892,
        longitude: -122.4394,
      },
    },
    {
      id: 3,
      title: "Parking 4",
      price: 10,
      rating: 5,
      spots: 30,
      free: 25,
      distance: 10.0,
      coordinate: {
        latitude: 37.78855,
        longitude: -122.4224,
      },
    },
  ];

  const toggleModal = (bool, item) => {
    setModalVisible(bool);
    setActiveModal(item);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <Modal
        useNativDriver
        isVisible={modalVisible}
        style={{ margin: 0, justifyContent: "flex-end", flex: 1 }}
        onBackdropPress={() => toggleModal(!modalVisible, null)}
        onBackButtonPress={() => toggleModal(!modalVisible, null)}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text onPress={() => toggleModal(!modalVisible, null)}>
              {activeModal.title}
            </Text>
            <SimpleLineIcons
              name="options-vertical"
              size={20}
              color="#999999"
            />
          </View>
          <Text style={{ color: "#888888", flex: 1, marginBottom: 15 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque dapibus mollis eros ac ullamcorper. Nulla tempor tempor
            imperdiet. Donec ultrices tempor egestas. Nullam magna nulla,
            blandit nec felis non, auctor fermentum ante. Maecenas at nisi
            finibus orci vehicula sodales. Curabitur mi augue, fermentum quis
            tristique a, aliquam quis lorem. Vivamus tellus massa, condimentum
            eget risus at, convallis ultricies mi. Aliquam suscipit porttitor
            nisi sit amet dictum.
          </Text>
          <View style={styles.parkingStats}>
            <Ionicons name="ios-pricetag" size={15} color="#aaaaaa">
              <Text style={styles.parkingStatsText}> ${activeModal.price}</Text>
            </Ionicons>
            <Ionicons name="ios-star" size={15} color="#aaaaaa">
              <Text style={styles.parkingStatsText}> {activeModal.rating}</Text>
            </Ionicons>
            <Entypo name="location-pin" size={17} color="#aaaaaa">
              <Text style={styles.parkingStatsText}>
                {" "}
                {activeModal.distance}km
              </Text>
            </Entypo>
            <Ionicons name="md-car" size={17} color="#aaaaaa">
              <Text style={styles.parkingStatsText}>
                {" "}
                {activeModal.free}/{activeModal.spots}
              </Text>
            </Ionicons>
          </View>
          <View style={styles.booking}>
            <Text>Choose your Booking Period:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  borderWidth: 0.8,
                  borderColor: "#888888",
                  borderRadius: 9,
                }}
              >
                <Picker
                  mode="dropdown"
                  selectedValue={hours[activeModal.id]}
                  onValueChange={(value) =>
                    setHours({ ...hours, [activeModal.id]: value })
                  }
                  style={{
                    width: 110,
                    color: "#000",
                    backgroundColor: "transparent",
                  }}
                >
                  <Picker.Item label="01:00" value={1} />
                  <Picker.Item label="02:00" value={2} />
                  <Picker.Item label="03:00" value={3} />
                  <Picker.Item label="04:00" value={4} />
                  <Picker.Item label="05:00" value={5} />
                </Picker>
              </View>
              <Text style={{ color: "#aaaaaa" }}> hrs</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.payBtn}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Proceed to pay ${hours[activeModal.id] * activeModal.price}
                </Text>
                <AntDesign name="right" size={20} color={"#fff"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Detected Location</Text>
          <Text style={styles.headerLocation}>
            San Francisco, US <AntDesign name="down" size={12} />
          </Text>
        </View>
        <View>
          <TouchableWithoutFeedback>
            <Ionicons name="ios-menu" size={30} />
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

  const renderParking = (item) => {
    const handleHours = (item, itemValue) => {
      setHours({ ...hours, [item.id]: itemValue });
    };
    return (
      <TouchableWithoutFeedback
        key={`parking-${item.id}`}
        onPress={() => setActive(item.id)}
      >
        <View style={[styles.parking, styles.shadow]}>
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

            <TouchableWithoutFeedback
              onPress={() => toggleModal(!modalVisible, item)}
            >
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
                    ${item.price * hours[item.id]}
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
                  <AntDesign name="right" size={25} color={"#fff"} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        {parkings.map((parking) => (
          <Marker key={`marker-${parking.id}`} coordinate={parking.coordinate}>
            <TouchableWithoutFeedback
              onPress={() => setStateActive(parking.id)}
            >
              <View
                style={[
                  styles.marker,
                  styles.shadow,
                  active === parking.id ? styles.active : null,
                ]}
              >
                <Text
                  style={{
                    color: "#D83C54",
                    fontWeight: "bold",
                    marginRight: 3,
                  }}
                >
                  ${parking.price}
                </Text>
                <Text>
                  ({parking.free}/{parking.spots})
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </Marker>
        ))}
      </MapView>
      {renderParkings()}
      {renderModal()}
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
    height: 100,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#888888",
  },
  headerLocation: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 5,
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
    backgroundColor: "#D83C54",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowColor: "#000",
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  marker: {
    justifyContent: "center",
    width: 90,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    height: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "white",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  active: {
    borderColor: "#ff2020",
  },
  modal: {
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 15,
    height: height * 0.7,
    width: width,
    margin: 0,
    borderRadius: 10,
  },
  modalHeader: {
    flex: 0.25,
    margin: 0,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  parkingStats: {
    flex: 0.25,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  booking: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  payBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D83C54",
    height: 50,
    width: width - 24 * 2,
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  parkingStatsText: {
    color: "black",
    fontWeight: "600",
  },
});

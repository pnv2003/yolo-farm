import React, { useState, useEffect, useCallback } from "react";
import * as Headers from "../constants/header";
import * as APIs from "../constants/api";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import * as mqtt from '../utils/mqtt';
import * as http from '../utils/http';


const GreenhouseController = () => {

  
  const navigation = useNavigation();

  const [irrigationMode, setIrrigationMode] = useState("AUTOMATIC");
const [irrigationLevel, setIrrigationLevel] = useState(12);
const [lightingMode, setLightingMode] = useState("AUTOMATIC");
const [lightingPower, setLightingPower] = useState(4820);
const [lightingIntensity, setLightingIntensity] = useState(617);
const [temperature, setTemperature] = useState(362);
const [temperatureMode, setTemperatureMode] = useState("MANUAL");
const [airhumid, setAirhumid] = useState(362);
const [airhumidMode, setAirhumidMode] = useState("MANUAL");

useFocusEffect(
  useCallback(() => {

    const client = mqtt.init();
    const topics = [APIs.SOIL_MOISTURE_FEED, APIs.LIGHT, APIs.AIR_HUMIDITY, APIs.TEMPERATURE];
    mqtt.connect(client, topics);
  
    client.onMessageArrived = (message) => {
      console.log("Topic: " + message.destinationName);
      console.log("Message: " + message.payloadString);

      const topic = message.destinationName;
      const data = message.payloadString;
      
      switch(topic) {
        case APIs.SOIL_MOISTURE:
          setIrrigationLevel(parseInt(data));
          break;
        case APIs.LIGHT:
          setLightingPower(parseInt(data)); // Assuming this updates the lighting power. Adjust as needed.
          break;
        case APIs.AIR_HUMIDITY:
          setAirhumid(parseInt(data));
          break;
        case APIs.TEMPERATURE:
          setTemperature(parseInt(data));
          break;
        default:
          console.warn(`Unhandled topic: ${topic}`);
      }
    }

    http.get('adafruit', APIs.SOIL_MOISTURE_FEED)
      .then((data) => {
        setIrrigationLevel(data.last_value);
      });

    http.get('adafruit', APIs.LIGHT)
      .then((data) => {
        setLightingPower(data.last_value); // Assuming this updates the lighting power. Adjust as needed.
      });

    http.get('adafruit', APIs.AIR_HUMIDITY)
      .then((data) => {
        setAirhumid(data.last_value);
      });

    http.get('adafruit', APIs.TEMPERATURE)
      .then((data) => {
        setTemperature(data.last_value);
      });

    return () => {
      // mqtt.disconnect(client);
    }
  }, [])
);


  const toggleIrrigationMode = () => {
    setIrrigationMode(irrigationMode === "AUTOMATIC" ? "MANUAL" : "AUTOMATIC");
  };

  const toggleTemperatureMode = () => {
    setTemperatureMode(temperatureMode === "MANUAL" ? "AUTOMATIC" : "MANUAL");
  };

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 20; 

  const getUnit = (title) => {
    switch (title) {
      case "Irrigation":
        return "%";
      case "Lighting":
        return "W/m^2";
      case "Temperature":
        return "°C";
      case "Air Humid":
        return "%"
      default:
        return "";
    }
  };

  const data = [
    {
      title: "Irrigation",
      value: irrigationLevel,
      mode: irrigationMode,
      toggleMode: toggleIrrigationMode,
      color: "rgba(46, 138, 138, 1)",
      icon: "tint", 
    },
    {
      title: "Lighting",
      value: `${lightingPower}`,
      mode: lightingMode,
      color: "rgba(0, 231, 46, 0.8)",
      icon: "lightbulb-o", 
    },
    {
      title: "Temperature",
      value: `${temperature}`,
      mode: temperatureMode,
      toggleMode: toggleTemperatureMode,
      color: "rgba(231, 156, 36, 0.8)",
      icon: "thermometer", 
    },
    {
      title: "Air Humid",
      value: `${airhumid}`,
      mode: temperatureMode,
      toggleMode: toggleTemperatureMode,
      color: "rgba(21, 156, 36, 0.8)",
      icon: "thermometer", 
    },
  ];

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.container,
        { backgroundColor: item.color, width: containerWidth, padding: 10 },
      ]}
    >
      <View style={styles.leftContent}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name={item.icon} size={18} color="white" /> {item.title}
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.bigDataValue}>{item.value}</Text>
        </View>
        <Text style={styles.unitText}>{getUnit(item.title)}</Text>
      </View>
      {/* Add a separator line */}
      <View style={styles.separator} />
      <View style={styles.rightContent}>
        <View style={styles.iconContainer}>
          <FontAwesome name="gear" size={24} color="white" />
        </View>
        {item.title === "Irrigation" && (
          <Text style={styles.statusText}>Keeping around 3%</Text>
        )}
        <Text
          style={[styles.modeText, item.mode === "MANUAL" && styles.manual]}
        >
          {item.mode}
        </Text>
        {item.toggleMode && (
          <Text onPress={item.toggleMode} style={styles.toggleButton}>
            TOGGLE MODE
          </Text>
        )}
        {item.title === "Temperature" && (
          <Text style={styles.warningText}>Warnings on</Text>
        )}
      </View>
     { /* TODO: onPress={() => navigation.navigate(Headers.IRRIGATION)} */}
      {item.title === "Irrigation" && (
        <TouchableOpacity
          style={styles.ripple}
          onPress={() => navigation.navigate(Headers.IRRIGATION)}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="gear" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {item.title === "Temperature" && (
        <TouchableOpacity
          style={styles.ripple}
          onPress={() => navigation.navigate(Headers.TEMPERATURE)}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="gear" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {item.title === "Lighting" && (
        <TouchableOpacity
          style={styles.ripple}
          onPress={() => navigation.navigate(Headers.LIGHTING)}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="gear" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
      {item.title === "Air Humid" && (
        <TouchableOpacity
          style={styles.ripple}
          onPress={() => navigation.navigate(Headers.AIR_HUMIDITY)}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="gear" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Graph" onPress={() => navigation.navigate("Graph")} />
        <Button title="Camera" onPress={() => navigation.navigate("Graph")} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 35,
    height: 250,
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
    alignItems: "center",
  },
  separator: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  rightContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  dataContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bigDataValue: {
    fontSize: 60,
    color: "rgba(255,255,255,0.5)", 
    fontWeight: "bold",
  },
  unitText: {
    fontSize: 12,
    color: "white", 
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: "white",
  },
  modeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  toggleButton: {
    color: "white",
    marginTop: 5,
  },
  warningText: {
    color: "white",
    marginTop: 10,
  },
});

export default GreenhouseController;
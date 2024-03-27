import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome

const Navbar = () => {
  return (
    <View style={styles.header}>
      {/* Add Logo */}
      <Image
        source={require("../assets/grass.png")}
        style={{ width: 50, height: 50, marginLeft: 10 }}
      />
      {/* Spacer */}
      <View style={{ flex: 1 }} />
      {/* Add Icons */}
      <View
        style={[styles.iconContainer, styles.iconShadow, { marginRight: 10 }]}
      >
        <FontAwesome name="bell" size={23} color="white" />
      </View>
      <View
        style={[styles.iconContainer, styles.iconShadow, { marginRight: 10 }]}
      >
        <FontAwesome name="bar-chart" size={23} color="white" />
      </View>
      <View style={[styles.iconContainer, styles.iconShadow]}>
        <FontAwesome name="user" size={23} color="white" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 134, 7, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconShadow: {
    elevation: 10, // Add elevation for shadow effect
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginLeft: 10,
  },
});

export default Navbar;

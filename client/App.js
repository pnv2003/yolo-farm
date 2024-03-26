import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import TestApp from "./components/TestApp";
import HomeScreen from "./components/Home";
import Navbar from "./components/Navbar";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from Expo vector icons

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      {/* Add HomeScreen component */}
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
});

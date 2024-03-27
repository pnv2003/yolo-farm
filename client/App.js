import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import IrrigationScreen from './screens/IrrigationScreen';
import * as Strings from './constants/string';
import * as Headers from './constants/header';
import PumpModeScreen from './screens/PumpModeScreen';
import SoilMoistureRangeScreen from './screens/SoilMoistureRangeScreen';
import NavigationBar from './components/NavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <NavigationBar {...props} />
          }}
        >
          <Stack.Screen 
            name={Headers.IRRIGATION}
            component={IrrigationScreen}
          />
          <Stack.Screen 
            name={Headers.PUMP_MODE}
            component={PumpModeScreen}
          />
          <Stack.Screen 
            name={Headers.SOIL_MOISTURE_RANGE}
            component={SoilMoistureRangeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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

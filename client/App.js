import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import IrrigationScreen from './screens/IrrigationScreen';
import * as Strings from './constants/string';
import * as Headers from './constants/header';
import PumpModeScreen from './screens/PumpModeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name={Headers.IRRIGATION}
          component={IrrigationScreen}
        />
        <Stack.Screen 
          name={Headers.PUMP_MODE}
          component={PumpModeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

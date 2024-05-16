import { Platform, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import IrrigationScreen from './screens/IrrigationScreen';
import * as Headers from './constants/header';
import PumpModeScreen from './screens/PumpModeScreen';
import SoilMoistureRangeScreen from './screens/SoilMoistureRangeScreen';
import NavigationBar from './components/NavigationBar';
import GreenhouseController from './components/Home';
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import Lighting from './screens/Lighting';
import LightingMode from './screens/LightingMode';
import LightingRange from './screens/LightingRange';
import Temperature from './screens/Temperature';
import TemperatureMode from './screens/TemperatureMode';
import TemperatureRange from './screens/TemperatureRange';
import AirHumidity from './screens/AirHumidity';
import AirHumidityMode from './screens/AirHumidityMode';
import AirHumidityRange from './screens/AirHumidityRange';
import PumpSchedule from './screens/PumpSchedule';
import AddScheduledTasks from './screens/AddScheduledTask';
import PlantCare from './screens/PlantCare';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

async function registerForPushNotificationAsync() {
  let token;

  if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C'
      });
  }

  if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
      }
      if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
      }

      token = (await Notifications.getExpoPushTokenAsync(
          { projectId: Constants.expoConfig.extra.eas.projectId }
      ));
      // console.log(token);
  } else {
      alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

async function sendPushNotification(expoPushToken, title, body, data = {}) {

  const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: data
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
  })
}

const Stack = createNativeStackNavigator();

export default function App() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Headers.PLANT_CARE}
          screenOptions={{
            header: (props) => <NavigationBar {...props} />
          }}
        >
          <Stack.Screen
            name={Headers.HOME}
            component={GreenhouseController}
          />
          <Stack.Screen 
            name={Headers.IRRIGATION}
            component={IrrigationScreen}
          />
          <Stack.Screen 
            name={Headers.PUMP_MODE}
            component={PumpModeScreen}
          />
          {/* <Stack.Screen
            name={Headers.PUMP_SCHEDULE}
            component={PumpSchedule}
          />
          <Stack.Screen 
            name={Headers.ADD_SCHEDULED_TASK}
            component={AddScheduledTasks}
          /> */}
          <Stack.Screen 
            name={Headers.SOIL_MOISTURE_RANGE}
            component={SoilMoistureRangeScreen}
          />
          <Stack.Screen 
            name={Headers.LIGHTING}
            component={Lighting}
          />
          {/* <Stack.Screen
            name={Headers.LIGHT_CONTROL_MODE}
            component={LightingMode}
          /> */}
          <Stack.Screen
            name={Headers.LIGHTING_RANGE}
            component={LightingRange}
          />
          <Stack.Screen
            name={Headers.TEMPERATURE}
            component={Temperature}
          />
          <Stack.Screen
            name={Headers.TEMP_CONTROL_MODE}
            component={TemperatureMode}
          />
          <Stack.Screen
            name={Headers.TEMP_RANGE}
            component={TemperatureRange}
          />
          <Stack.Screen
            name={Headers.AIR_HUMIDITY}
            component={AirHumidity}
          />
          <Stack.Screen
            name={Headers.AIR_HUMI_CONTROL_MODE}
            component={AirHumidityMode}
          />
          <Stack.Screen
            name={Headers.AIR_HUMI_RANGE}
            component={AirHumidityRange}
          />
          <Stack.Screen
            name={Headers.PLANT_CARE}
            component={PlantCare}
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

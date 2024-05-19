import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import * as mqtt from '../utils/mqtt';
import * as APIs from "../constants/api";

const Graph = () => {
  const [soilMoistureData, setSoilMoistureData] = useState([]);
  const [airHumidData, setAirHumidData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [pumpData, setPumpData] = useState([]);
  const [fanData, setFanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilMoistureResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/soil-moisture/data/chart');
        const soilMoistureJsonData = await soilMoistureResponse.json();
        setSoilMoistureData(soilMoistureJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        const airHumidResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/air-humid/data/chart');
        const airHumidJsonData = await airHumidResponse.json();
        setAirHumidData(airHumidJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        const lightResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/light/data/chart');
        const lightJsonData = await lightResponse.json();
        setLightData(lightJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        const tempResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/temp/data/chart');
        const tempJsonData = await tempResponse.json();
        setTempData(tempJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        const pumpResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/pumb/data/chart');
        const pumpJsonData = await pumpResponse.json();
        setPumpData(pumpJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        const fanResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/fan/data/chart');
        const fanJsonData = await fanResponse.json();
        setFanData(fanJsonData.data.map(([date, value]) => ({ date, value: parseFloat(value) })));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const client = mqtt.init();
    const topics = [APIs.SOIL_MOISTURE_FEED, APIs.LIGHT, APIs.AIR_HUMIDITY, APIs.TEMPERATURE, APIs.PUMP_FEED, APIs.FAN];
    
    mqtt.connect(client, topics);
    
    client.onMessageArrived = (message) => {
      const topic = message.destinationName;
      const data = message.payloadString;
      const value = parseFloat(data);
      const date = new Date().toISOString().split('T')[0];

      switch(topic) {
        case APIs.SOIL_MOISTURE_FEED:
          setSoilMoistureData((prevData) => [...prevData, { date, value }]);
          break;
        case APIs.LIGHT:
          setLightData((prevData) => [...prevData, { date, value }]);
          break;
        case APIs.AIR_HUMIDITY:
          setAirHumidData((prevData) => [...prevData, { date, value }]);
          break;
        case APIs.TEMPERATURE:
          setTempData((prevData) => [...prevData, { date, value }]);
          break;
        case APIs.PUMP_FEED:
          setPumpData((prevData) => [...prevData, { date, value }]);
          break;
        case APIs.FAN:
          setFanData((prevData) => [...prevData, { date, value }]);
          break;
        default:
          console.warn(`Unhandled topic: ${topic}`);
      }
    };

    return () => {
      client.disconnect();
    };
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', marginRight: 50  }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="analytics-outline" size={24} color="black" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Biểu đồ thống kê</Text>
          </View>

          {/* Soil Moisture Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Độ ẩm đất (%)</Text>
          <LineChart
            data={{
              labels: soilMoistureData.map(({ date }) => date),
              datasets: [{ data: soilMoistureData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />

          {/* Air Humidity Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Độ ẩm không khí (%)</Text>
          <LineChart
            data={{
              labels: airHumidData.map(({ date }) => date),
              datasets: [{ data: airHumidData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />

          {/* Light Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cường độ ánh sáng (cd)</Text>
          <LineChart
            data={{
              labels: lightData.map(({ date }) => date),
              datasets: [{ data: lightData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />

          {/* Temperature Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nhiệt độ (℃)</Text>
          <LineChart
            data={{
              labels: tempData.map(({ date }) => date),
              datasets: [{ data: tempData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />

          {/* Pump Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Máy bơm nước</Text>
          <LineChart
            data={{
              labels: pumpData.map(({ date }) => date),
              datasets: [{ data: pumpData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(75, 0, 130, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />

          {/* Fan Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Quạt Mini</Text>
          <LineChart
            data={{
              labels: fanData.map(({ date }) => date),
              datasets: [{ data: fanData.map(({ value }) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#f0f0f0',
              backgroundGradientTo: '#f0f0f0',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            fromZero={true}
            withHorizontalLabels={true}
            withVerticalLabels={false}
            formatXLabel={value => value}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Graph;

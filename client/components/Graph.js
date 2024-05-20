import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, ScrollView, TextInput, Button,  StyleSheet} from 'react-native';
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
  const [isFiltering, setIsFiltering] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const filteredData = (data) => {
    if (!isFiltering) return data;
    return data.filter(({ date }) => date >= startDate && date <= endDate);
  };

  const handleFilter = () => {
    setIsFiltering(true);
  };

  const handleClearFilter = () => {
    setIsFiltering(false);
    setStartDate('');
    setEndDate('');
  };

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
 
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginRight: 10 }}
              placeholder="Ngày bắt đầu"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginRight: 10 }}
              placeholder="Ngày kết thúc"
              value={endDate}
              onChangeText={setEndDate}
            />
            <Button title="Lọc" onPress={handleFilter}/>
            <Button title="Hủy lọc" onPress={handleClearFilter} />
            
          </View>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>*Nhập ngày theo định dạng YYYY-MM-DD. Ví dụ: 2024-03-28</Text>
          {/* Soil Moisture Chart */}
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Độ ẩm đất (%)</Text>
          <LineChart
            data={{
              labels: filteredData(soilMoistureData).map(({ date }) => date),
              datasets: [{ data: filteredData(soilMoistureData).map(({ value }) => value) }]
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
              labels: filteredData(airHumidData).map(({ date }) => date),
              datasets: [{ data: filteredData(airHumidData).map(({ value }) => value) }]
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
              labels: filteredData(lightData).map(({ date }) => date),
              datasets: [{ data: filteredData(lightData).map(({ value }) => value) }]
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
              labels: filteredData(tempData).map(({ date }) => date),
              datasets: [{ data: filteredData(tempData).map(({ value }) => value) }]
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
              labels: filteredData(pumpData).map(({ date }) => date),
              datasets: [{ data: filteredData(pumpData).map(({ value }) => value) }]
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
              labels: filteredData(fanData).map(({ date }) => date),
              datasets: [{ data: filteredData(fanData).map(({ value }) => value) }]
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
const styles = StyleSheet.create({
  button: {
    margin: 10, // Adjust the margin as needed
  },
});
export default Graph;
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const Graph = () => {
  const [soilMoistureData, setSoilMoistureData] = useState(null);
  const [airHumidData, setAirHumidData] = useState(null);
  const [lightData, setLightData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soilMoistureResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/soil-moisture/data/chart');
        const soilMoistureJsonData = await soilMoistureResponse.json();
        setSoilMoistureData(soilMoistureJsonData);

        const airHumidResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/air-humid/data/chart');
        const airHumidJsonData = await airHumidResponse.json();
        setAirHumidData(airHumidJsonData);

        const lightResponse = await fetch('https://io.adafruit.com/api/v2/thanhduy/feeds/light/data/chart');
        const lightJsonData = await lightResponse.json();
        setLightData(lightJsonData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="analytics-outline" size={24} color="black" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Biểu đồ thống kê</Text>
          </View>

          <LineChart
            data={{
              labels: soilMoistureData.data.map(([date]) => date.split('T')[0]),
              datasets: [{ data: soilMoistureData.data.map(([, value]) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '0' // Đặt bán kính bằng 0 để loại bỏ chấm
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

          <LineChart
            data={{
              labels: airHumidData.data.map(([date]) => date.split('T')[0]),
              datasets: [{ data: airHumidData.data.map(([, value]) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
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

          <LineChart
            data={{
              labels: lightData.data.map(([date]) => date.split('T')[0]),
              datasets: [{ data: lightData.data.map(([, value]) => value) }]
            }}
            width={screenWidth * 0.9}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
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
        </View>
      )}
    </ScrollView>
  );
};

export default Graph;
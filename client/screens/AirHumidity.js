import React from "react";
import { View } from "react-native";
import AirHumidityController from "../components/AirHumidityController";

const AirHumidity = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AirHumidityController />
        </View>
    )
}

export default AirHumidity;
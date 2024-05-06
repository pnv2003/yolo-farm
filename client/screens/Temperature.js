import React from "react";
import { View } from "react-native";
import TemperatureController from "../components/TemperatureController";

const Temperature = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TemperatureController />
        </View>
    )
}

export default Temperature;
import React from "react";
import { View } from "react-native";
import LightingController from "../components/LightingController";

const Lighting = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <LightingController />
        </View>
    );
}

export default Lighting;
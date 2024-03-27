import React from "react";
import { View } from "react-native";
import IrrigationController from "../components/IrrigationController";

const IrrigationScreen = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <IrrigationController />
        </View>
    );
};

export default IrrigationScreen;
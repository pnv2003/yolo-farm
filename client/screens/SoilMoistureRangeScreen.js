import React, { useCallback, useState } from "react";
import * as Strings from '../constants/string';
import * as Errors from '../constants/error';
import * as APIs from '../constants/api';
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { MyTheme } from "../constants/theme";
import * as http from "../utils/http";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import RangeSelect from "../components/RangeSelect";

const SoilMoistureRangeScreen = () => {

    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            http.get('server', APIs.SOIL_MOISTURE_RANGE)
                .then((data) => {
                    setMinValue(data.minMoisture.toString());
                    setMaxValue(data.maxMoisture.toString());
                    setLoading(false);

                    console.log("Got min: " + data.minMoisture);
                    console.log("Got max: " + data.maxMoisture);
                })
        }, [])
    );

    function handleSave() {
        console.log(minValue);
        console.log(maxValue);

        http.request(
            'server',
            'PUT', 
            APIs.SOIL_MOISTURE_RANGE,
            {
                minMoisture: parseInt(minValue),
                maxMoisture: parseInt(maxValue)
            }
        );
    }

    return (
        loading ? <Loading color={MyTheme.blue} /> :
        <RangeSelect
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            onSave={handleSave}
            minPossible={0}
            maxPossible={100}
            unit={Strings.SOIL_MOISTURE_UNIT}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 50
    },
    desc: {
        textAlign: 'justify',
        paddingHorizontal: 50,
        marginBottom: 20
    },
    inputField: {
        // flex: 1,
        width: '80%',
        alignItems: 'center'
    },  
    input: {
        height: 75,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '50%',
        fontSize: 36
    },
});

export default SoilMoistureRangeScreen;
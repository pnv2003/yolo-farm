import React, { useCallback, useState } from "react";
import * as Strings from '../constants/string';
import * as Errors from '../constants/error';
import * as APIs from '../constants/api';
import * as http from "../utils/http";
import RangeSelect from "../components/RangeSelect";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { MyTheme } from "../constants/theme";
import Loading from "../components/Loading";

const AirHumidityRange = () => {
    const [minValue, setMinValue] = useState("45");
    const [maxValue, setMaxValue] = useState("60");
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            http.get('server', APIs.AIR_HUMI_RANGE)
                .then((data) => {
                    setMinValue(data.minHumi.toString())
                    setMaxValue(data.maxHumi.toString())

                    console.log("Got min: " + data.minHumi);
                    console.log("Got max: " + data.maxHumi);

                    setLoading(false);
                });
        }, [])
    );

    function handleSave() {
        console.log(minValue);
        console.log(maxValue);

        http.request(
            'server',
            'PUT', 
            APIs.AIR_HUMI_RANGE,
            {
                minHumi: parseInt(minValue),
                maxHumi: parseInt(maxValue)
            }
        );
    }

    return (
        loading ? <Loading color={MyTheme.green} /> :
        <RangeSelect
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            onSave={handleSave}
            minPossible={0}
            maxPossible={100}
            unit={Strings.AIR_HUMIDITY_UNIT}
        />
    );
}

export default AirHumidityRange;
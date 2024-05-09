import React, { useCallback, useState } from "react";
import * as APIs from '../constants/api';
import * as http from "../utils/http";
import * as Strings from "../constants/string";
import RangeSelect from "../components/RangeSelect";
import { useFocusEffect } from "@react-navigation/native";

const TemperatureRange = () => {
    const [minValue, setMinValue] = useState("20");
    const [maxValue, setMaxValue] = useState("30");

    useFocusEffect(
        useCallback(() => {
            http.get('server', APIs.TEMP_RANGE)
                .then((data) => {
                    setMinValue(data.minTemp.toString());
                    setMaxValue(data.maxTemp.toString());
                    console.log("Got min: " + data.minTemp);
                    console.log("Got max: " + data.maxTemp);
                })
        }, [])
    );

    function handleSave() {
        console.log(minValue);
        console.log(maxValue);

        http.request(
            'server',
            'PUT', 
            APIs.TEMP_RANGE,
            {
                minTemp: parseInt(minValue),
                maxTemp: parseInt(maxValue)
            }
        );
    }

    return (
        <RangeSelect
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            onSave={handleSave}
            minPossible={-Infinity}
            maxPossible={Infinity}
            unit={Strings.TEMP_UNIT}
        />
    );
}

export default TemperatureRange;
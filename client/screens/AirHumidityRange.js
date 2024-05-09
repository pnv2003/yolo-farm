import React, { useCallback, useState } from "react";
import * as Strings from '../constants/string';
import * as Errors from '../constants/error';
import * as APIs from '../constants/api';
import * as http from "../utils/http";
import RangeSelect from "../components/RangeSelect";
import { useFocusEffect } from "@react-navigation/native";

const AirHumidityRange = () => {
    const [minValue, setMinValue] = useState("3000");
    const [maxValue, setMaxValue] = useState("13000");

    useFocusEffect(
        useCallback(() => {
            http.get('server', APIs.AIR_HUMI_RANGE)
                .then((data) => {
                    setMinValue(data.minHumi.toString())
                    setMaxValue(data.maxHumi.toString())

                    console.log("Got min: " + data.minHumi);
                    console.log("Got max: " + data.maxHumi);
                })
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
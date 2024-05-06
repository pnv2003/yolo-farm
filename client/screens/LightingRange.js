import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import * as Strings from '../constants/string';
import * as Errors from '../constants/error';
import * as APIs from '../constants/api';
import * as http from "../utils/http";
import RangeSelect from "../components/RangeSelect";

const LightingRange = () => {
    const [minValue, setMinValue] = useState(3000);
    const [maxValue, setMaxValue] = useState(13000);

    // useFocusEffect(
    //     useCallback(() => {
    //         http.get('server', APIs.LIGHT_INTENSITY_RANGE)
    //             .then((data) => {
    //                 //TODO
    //                 // setMinValue(data.minMoisture.toString());
    //                 // setMaxValue(data.maxMoisture.toString());

    //                 // console.log("Got min: " + data.minMoisture);
    //                 // console.log("Got max: " + data.maxMoisture);
    //             })
    //     }, [])
    // );

    function handleSave() {
        console.log(minValue);
        console.log(maxValue);

        // http.request(
        //     'server',
        //     'PUT', 
        //     APIs.LIGHT_INTENSITY_RANGE,
        //     {
        //         // TODO
        //         // minMoisture: parseInt(minValue),
        //         // maxMoisture: parseInt(maxValue)
        //     }
        // );
    }

    return (
        <RangeSelect 
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            onSave={handleSave}
            minPossible={0}
            maxPossible={Infinity}
            unit="lux"
        />
    );
}

export default LightingRange;
import React, { useState } from "react";
import RangeSelect from "../components/RangeSelect";

const TemperatureRange = () => {
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(30);

    // useFocusEffect(
    //     useCallback(() => {
    //         http.get('server', APIs.)
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
        //     APIs.,
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
            minPossible={-Infinity}
            maxPossible={Infinity}
            unit={String.fromCharCode(176) + "C"}
        />
    );
}

export default TemperatureRange;
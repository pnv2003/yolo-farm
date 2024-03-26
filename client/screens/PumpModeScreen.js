import React, { useState } from "react";
import * as Strings from "./../constants/string";
import { View } from "react-native";
import ModeItem from "../components/ModeItem";
import { faBook, faCalendar, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const PumpModeScreen = () => {

    const [mode, setMode] = useState(Strings.AUTOMATIC);

    return (
        <View style={{
            flex: 1,
            alignItems: 'center'
        }}>
            <ModeItem 
                title={Strings.AUTOMATIC}
                description={Strings.MODE_AUTOMATIC_DESCRIPTION}
                icon={faWandMagicSparkles}
                color={"blue"}
                selected={mode === Strings.AUTOMATIC}
                setMode={setMode}
            />
            <ModeItem 
                title={Strings.SCHEDULED}
                description={Strings.MODE_SCHEDULED_DESCRIPTION}
                icon={faCalendar}
                color={"green"}
                selected={mode === Strings.SCHEDULED}
                setMode={setMode}
            />
            <ModeItem
                title={Strings.MANUAL}
                description={Strings.MODE_MANUAL_DESCRIPTION}
                icon={faBook}
                color={"yellow"}
                selected={mode === Strings.MANUAL}
                setMode={setMode}
            />
        </View>
    )
};

export default PumpModeScreen;

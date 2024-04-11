import React, { useCallback, useState } from "react";
import * as Strings from "./../constants/string";
import * as Modes from "./../constants/mode";
import * as APIs from "./../constants/api";
import { View } from "react-native";
import ModeItem from "../components/ModeItem";
import { faBook, faCalendar, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { MyTheme } from "../constants/theme";
import * as http from "../utils/http";
import { useFocusEffect } from "@react-navigation/native";

const PumpModeScreen = () => {

    const [mode, setMode] = useState(Modes.AUTO);
    const [pendingMode, setPendingMode] = useState(Modes.AUTO);
    const [confirmVisible, setConfirmVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            http.get('server', APIs.PUMP_MODE, Strings.PUMP_MODE)
                .then((data) => {
                    setMode(data.mode);
                    console.log("Got mode: " + data.mode);
                })
        }, [])
    );

    function onSelect(selectedMode) {
        if (mode !== selectedMode) {
            setPendingMode(selectedMode);
            setConfirmVisible(true);
        }
    }

    function onConfirm() {
        setMode(pendingMode);
        setConfirmVisible(false);

        console.log("Send: " + pendingMode);
        http.request(
            'server',
            'PUT', 
            APIs.PUMP_MODE,
            {
                mode: pendingMode
            },
            Strings.MODE
        );
    }

    function onCancel() {
        setConfirmVisible(false);
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center'
        }}>
            <ModeItem
                title={Strings.AUTOMATIC}
                description={Strings.MODE_AUTOMATIC_DESCRIPTION}
                icon={faWandMagicSparkles}
                color={MyTheme.blue}
                selected={mode === Modes.AUTO}
                onPress={() => onSelect(Modes.AUTO)}
            />
            <ModeItem
                title={Strings.SCHEDULED}
                description={Strings.MODE_SCHEDULED_DESCRIPTION}
                icon={faCalendar}
                color={MyTheme.green}
                selected={mode === Modes.SCHED}
                onPress={() => onSelect(Modes.SCHED)}
            />
            <ModeItem
                title={Strings.MANUAL}
                description={Strings.MODE_MANUAL_DESCRIPTION}
                icon={faBook}
                color={MyTheme.orange}
                selected={mode === Modes.MANUAL}
                onPress={() => onSelect(Modes.MANUAL)}
            />
            <Portal>
                <Dialog visible={confirmVisible} onDismiss={() => setConfirmVisible(false)}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{Strings.modeConfirm(Strings.WATER_PUMP, Modes.modeTitles[pendingMode])}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onConfirm}
                        >
                            {Strings.CONFIRM}
                        </Button>
                        <Button onPress={onCancel}
                        >
                            {Strings.CANCEL}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
};

export default PumpModeScreen;

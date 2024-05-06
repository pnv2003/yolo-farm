import React, { useCallback, useState } from "react";
import * as Strings from "./../constants/string";
import * as Modes from "./../constants/mode";
import * as APIs from "./../constants/api";
import * as http from "../utils/http";
import { MyTheme } from "../constants/theme";
import ModeItem from "../components/ModeItem";
import { View } from "react-native";
import { faBook, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const AirHumidityMode = () => {
    const [mode, setMode] = useState(Modes.MANUAL);
    const [pendingMode, setPendingMode] = useState(Modes.MANUAL);
    const [confirmVisible, setConfirmVisible] = useState(false);

    // useFocusEffect(
    //     useCallback(() => {
    //         http.get('server', APIs.LIGHT_CONTROL_MODE)
    //             .then((data) => {
    //                 setMode(data.mode);
    //                 console.log("Got mode: " + data.mode);
    //             })
    //     }, [])
    // );

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
        // http.request(
        //     'server',
        //     'PUT', 
        //     APIs.L,
        //     {
        //         mode: pendingMode
        //     }
        // );
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
                        <Text variant="bodyMedium">
                            {Strings.modeConfirm(
                                Strings.AIR_HUMI_CONTROL, 
                                Modes.modeTitles[pendingMode]
                            )}
                            </Text>
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
}

export default AirHumidityMode;
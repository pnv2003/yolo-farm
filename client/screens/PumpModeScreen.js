import React, { useState } from "react";
import * as Strings from "./../constants/string";
import * as Modes from "./../constants/mode";
import { View } from "react-native";
import ModeItem from "../components/ModeItem";
import { faBook, faCalendar, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { MyTheme } from "../constants/theme";

const PumpModeScreen = () => {

    const [mode, setMode] = useState(Modes.AUTO);
    const [pendingMode, setPendingMode] = useState(Modes.AUTO);
    const [confirmVisible, setConfirmVisible] = useState(false);

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
                onPress={() => {
                    if (mode !== Modes.AUTO) {
                        setPendingMode(Modes.AUTO);
                        setConfirmVisible(true);
                    }
                }}
            />
            <ModeItem
                title={Strings.SCHEDULED}
                description={Strings.MODE_SCHEDULED_DESCRIPTION}
                icon={faCalendar}
                color={MyTheme.green}
                selected={mode === Modes.SCHED}
                onPress={() => {
                    if (mode !== Modes.SCHED) {
                        setPendingMode(Modes.SCHED);
                        setConfirmVisible(true);
                    }
                }}
            />
            <ModeItem
                title={Strings.MANUAL}
                description={Strings.MODE_MANUAL_DESCRIPTION}
                icon={faBook}
                color={MyTheme.orange}
                selected={mode === Modes.MANU}
                onPress={() => {
                    if (mode !== Modes.MANU) {
                        setPendingMode(Modes.MANU);
                        setConfirmVisible(true);
                    }
                }}
            />
            <Portal>
                <Dialog visible={confirmVisible} onDismiss={() => setConfirmVisible(false)}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{Strings.modeConfirm(Strings.WATER_PUMP, Modes.modeTitles[pendingMode])}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setMode(pendingMode);
                            setConfirmVisible(false);
                        }}
                        >
                            {Strings.CONFIRM}
                        </Button>
                        <Button onPress={() => {
                            setConfirmVisible(false);
                        }}
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

import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import * as Strings from './../constants/string';
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

const DeviceToggler = ({enabled, setEnabled, disabled}) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 100,
            justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <FontAwesomeIcon icon={faDroplet} size={24} color="#0095FF"/>
                <View>
                    <Text>{Strings.WATER_PUMP}</Text>
                    <Text>{enabled ? Strings.ON : Strings.OFF}</Text>
                </View>
            </View>
            <Switch
                color="#0095FF"
                value={enabled}
                onValueChange={() => {
                    setEnabled(prev => !prev)
                }}
                disabled={disabled}
            />
        </View>
    );
};

export default DeviceToggler;
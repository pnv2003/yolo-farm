import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import * as Strings from './../constants/string';
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

const DeviceToggler = ({enabled, onSwitch, disabled, color, icon, deviceName}) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 100,
            justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <FontAwesomeIcon icon={icon} size={24} color={color} />
                <View>
                    <Text>{deviceName}</Text>
                    <Text>{enabled ? Strings.ON : Strings.OFF}</Text>
                </View>
            </View>
            <Switch
                color={color}
                value={enabled}
                onValueChange={onSwitch}
                disabled={disabled}
            />
        </View>
    );
};

export default DeviceToggler;
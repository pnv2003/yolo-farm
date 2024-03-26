import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import * as Strings from './../constants/string';
import { Switch, Text, View } from "react-native";

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
                <FontAwesomeIcon icon={faDroplet} />
                <View>
                    <Text>{Strings.WATER_PUMP}</Text>
                    <Text>{enabled ? Strings.ON : Strings.OFF}</Text>
                </View>
            </View>
            <Switch
                trackColor={{
                    false: '#767577',
                    true: '#4195E9'
                }}
                thumbColor={'#fff'}
                ios_backgroundColor={"#3e3e3e"}
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
import React, { useCallback, useState } from "react";
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import * as Modes from "../constants/mode";
import * as APIs from "../constants/api";
import * as mqtt from "../utils/mqtt";
import * as http from "../utils/http";
import { useFocusEffect } from "@react-navigation/native";
import DeviceToggler from "./DeviceToggler";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFan, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { MyTheme } from "../constants/theme";
import { Text } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import SettingItem from "./SettingItem";
import ControllerLayout from "../layouts/ControllerLayout";
import Loading from "./Loading";

const TemperatureController = () => {
    const [temperature, setTemperature] = useState(27);
    const [fanOn, setFanOn] = useState(false);
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(30);
    const [mode, setMode] = useState(Modes.MANUAL);
    const [loading, setLoading] = useState(true);
    const warning = temperature < minValue || temperature > maxValue;

    useFocusEffect(
        useCallback(() => {
            const client = mqtt.init();
            mqtt.connect(client, [APIs.TEMPERATURE, APIs.FAN]);
            client.onMessageArrived = (message) => {
                topic = message.destinationName;
                data = message.payloadString;

                if (topic === APIs.TEMPERATURE) {
                    setTemperature(parseInt(data));
                } else if (topic === APIs.FAN) {
                    setFanOn(data == "1");
                }
            };

            Promise.all([
                http.get('adafruit', APIs.TEMPERATURE),
                http.get('adafruit', APIs.FAN),
                http.get('server', APIs.TEMP_CONTROL_MODE),
                http.get('server', APIs.TEMP_RANGE)
            ]).then(([
                tempData,
                fanData,
                tempModeData,
                rangeData
            ]) => {
                setTemperature(parseInt(tempData.last_value));
                setFanOn(parseInt(fanData.last_value));
                setMode(tempModeData.mode);
                setMinValue(rangeData.minTemp);
                setMaxValue(rangeData.maxTemp);
                setLoading(false);
            });
        }, [])
    );

    function onToggleFan() {
        console.log("Toggled");

        http.request(
            'adafruit',
            'POST',
            APIs.FAN_DATA,
            {
                value: fanOn ? '0' : '1'
            }
        );
        setFanOn(!fanOn);
    }

    const devices = (
        <DeviceToggler
            deviceName={Strings.FAN}
            enabled={fanOn}
            onSwitch={onToggleFan}
            disabled={mode !== Modes.MANUAL}
            color={MyTheme.orange}
            icon={faFan}
        />
    );
    const meters = (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20
        }}>
            <View style={{flex: 1, flexDirection: 'row', gap: 10 }}>
                { warning ? <FontAwesomeIcon icon={faWarning} color={MyTheme.red} size={32} /> : null}
                <Text style={{ fontSize: 24, color: warning ? MyTheme.red : MyTheme.black}}>
                    {Strings.TEMPERATURE}
                </Text>
            </View>
            <AnimatedCircularProgress
                size={200}
                width={20}
                fill={temperature}
                rotation={0}
                tintColor={ warning ? MyTheme.red : MyTheme.orange }
                backgroundColor="#CCCCCC"
            >
            {
                () => (
                    <>
                        <Text style={{ fontSize: 50 }}>
                            {temperature}
                        </Text>
                        <Text style={{ fontSize: 25 }}>{Strings.TEMP_UNIT}</Text>
                    </>
                )
            }
            </AnimatedCircularProgress>
        </View>
    );
    const settings = (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10
        }}>
            <SettingItem
                title={Strings.MODE}
                content={Modes.modeTitles[mode]}
                icon={faGear}
                target={Headers.TEMP_CONTROL_MODE}
                primColor={MyTheme.orange}
                bgColor={MyTheme.darkblue}
            />
            <SettingItem 
                title={Strings.ALLOWED_RANGE}
                content={`${minValue} - ${maxValue} ${Strings.TEMP_UNIT}`}
                icon={faWarning}
                target={Headers.TEMP_RANGE}
                primColor={MyTheme.orange}
                bgColor={MyTheme.darkblue}
            />
        </View>
    );

    return (
        loading ? <Loading color={MyTheme.orange} /> : 
        <ControllerLayout
            devices={devices}
            meters={meters}
            settings={settings}
        />
    )
}

export default TemperatureController;
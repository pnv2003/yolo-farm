import React, { useCallback, useState } from "react"
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import * as Modes from "../constants/mode";
import * as APIs from "../constants/api";
import * as mqtt from "../utils/mqtt";
import * as http from "../utils/http";
import { useFocusEffect } from "@react-navigation/native";
import { MyTheme } from "../constants/theme";
import { View } from "react-native";
import DeviceToggler from "./DeviceToggler";
import { faFan, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import SettingItem from "./SettingItem";
import ControllerLayout from "../layouts/ControllerLayout";
import { Text } from "react-native-paper";

const AirHumidityController = () => {
    const [airHumi, setAirHumi] = useState(0);
    const [fanOn, setFanOn] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(2000);
    const [mode, setMode] = useState(Modes.MANUAL);
    const warning = airHumi < minValue || airHumi > maxValue;

    useFocusEffect(
        useCallback(() => {
            const client = mqtt.init();
            mqtt.connect(client, [APIs.AIR_HUMIDITY, APIs.FAN]);
            client.onMessageArrived = (message) => {
                topic = message.destinationName;
                data = message.payloadString;

                if (topic === APIs.AIR_HUMIDITY) {
                    setAirHumi(parseInt(data));
                } else if (topic === APIs.FAN) {
                    setFanOn(data == "1");
                }
            };

            http.get('adafruit', APIs.AIR_HUMIDITY)
                .then((data) => {
                    setAirHumi(parseInt(data.last_value));
                    console.log("Got air humi: " + data.last_value);
                });

            http.get('adafruit', APIs.FAN)
                .then((data) => {
                    setFanOn(parseInt(data.last_value));
                    console.log("Got fan: " + data.last_value);
                });

            http.get('server', APIs.AIR_HUMI_CONTROL_MODE)
                .then((data) => {
                    setMode(data.mode)
                    console.log("Got mode: " + data.mode);
                });

            http.get('server', APIs.AIR_HUMI_RANGE)
                .then((data) => {
                    setMinValue(data.minHumi);
                    setMaxValue(data.maxHumi);
                })
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
        ).then((response) => {
            if (response.error) {
                console.log("Failed to toggle fan: " + response.error);
            }
        });
        setFanOn(!fanOn);
    }

    const devices = (
        <DeviceToggler
            deviceName={Strings.FAN}
            enabled={fanOn}
            onSwitch={onToggleFan}
            disabled={true}
            color={MyTheme.green}
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
            { warning ? <FontAwesomeIcon icon={faWarning} color={MyTheme.red} size={32} /> : null}
            <Text style={{ fontSize: 24, color: warning ? MyTheme.red : MyTheme.black}}>
                {Strings.AIR_HUMIDITY}
            </Text>
            <AnimatedCircularProgress
                size={200}
                width={20}
                fill={airHumi}
                rotation={0}
                tintColor={ warning ? MyTheme.red : MyTheme.green }
                backgroundColor="#CCCCCC"
            >
            {
                () => (
                    <>
                        <Text style={{ fontSize: 50 }}>
                            {airHumi}
                        </Text>
                        <Text style={{ fontSize: 25 }}>{Strings.AIR_HUMIDITY_UNIT}</Text>
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
            gap: 10
        }}>
            <SettingItem
                title={Strings.MODE}
                content={Modes.modeTitles[mode]}
                icon={faGear}
                target={Headers.AIR_HUMI_CONTROL_MODE}
                disabled={true}
                primColor={MyTheme.green}
                bgColor={MyTheme.black}
            />
            <SettingItem 
                title={Strings.ALLOWED_RANGE}
                content={`${minValue} - ${maxValue} ${Strings.AIR_HUMIDITY_UNIT}`}
                icon={faWarning}
                target={Headers.AIR_HUMI_RANGE}
                primColor={MyTheme.green}
                bgColor={MyTheme.black}
            />
        </View>
    );

    return (
        <ControllerLayout
            devices={devices}
            meters={meters}
            settings={settings}
        />
    )
}

export default AirHumidityController;
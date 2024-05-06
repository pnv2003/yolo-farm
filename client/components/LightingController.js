import React, { useCallback, useState } from "react"
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import * as Modes from "../constants/mode";
import * as APIs from "../constants/api";
import * as mqtt from "../utils/mqtt";
import * as http from "../utils/http";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ControllerLayout from "../layouts/ControllerLayout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFan, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { MyTheme } from "../constants/theme";
import { Text } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import SettingItem from "./SettingItem";
import DeviceToggler from "./DeviceToggler";


const LightingController = () => {
    const [lightIntensity, setLightIntensity] = useState(0);
    const [fanOn, setFanOn] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(2000);
    const [mode, setMode] = useState(Modes.MANUAL);
    const warning = lightIntensity < minValue || lightIntensity > maxValue;

    useFocusEffect(
        useCallback(() => {
            const client = mqtt.init();
            mqtt.connect(client, [APIs.LIGHT, APIs.FAN]);
            client.onMessageArrived = (message) => {
                topic = message.destinationName;
                data = message.payloadString;

                if (topic === APIs.LIGHT) {
                    setLightIntensity(parseInt(data));
                } else if (topic === APIs.FAN) {
                    setFanOn(data == "1");
                }
            };

            http.get('adafruit', APIs.LIGHT)
                .then((data) => {
                    setLightIntensity(parseInt(data.last_value));
                    console.log("Got lighting: " + data.last_value);
                });

            http.get('adafruit', APIs.FAN)
                .then((data) => {
                    setFanOn(parseInt(data.last_value));
                    console.log("Got fan: " + data.last_value);
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
            color={MyTheme.yellow}
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
                {Strings.LIGHT_INTENSITY}
            </Text>
            <AnimatedCircularProgress
                size={200}
                width={20}
                fill={lightIntensity}
                rotation={0}
                tintColor={ warning ? MyTheme.red : MyTheme.yellow }
                backgroundColor="#CCCCCC"
            >
            {
                () => (
                    <>
                        <Text style={{ fontSize: 50 }}>
                            {lightIntensity}
                        </Text>
                        <Text style={{ fontSize: 25 }}>{Strings.LIGHT_INTENSITY_UNIT}</Text>
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
                target={Headers.LIGHT_CONTROL_MODE}
                primColor={MyTheme.yellow}
                bgColor={MyTheme.black}
            />
            <SettingItem 
                title={Strings.ALLOWED_RANGE}
                content={`${minValue} - ${maxValue} ${Strings.LIGHT_INTENSITY_UNIT}`}
                icon={faWarning}
                target={Headers.LIGHTING_RANGE}
                primColor={MyTheme.yellow}
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

export default LightingController;
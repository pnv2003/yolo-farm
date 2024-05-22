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
import Loading from "./Loading";
// import DeviceToggler from "./DeviceToggler";


const LightingController = () => {
    const [lightIntensity, setLightIntensity] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(2000);
    const [loading, setLoading] = useState(true);
    const warning = lightIntensity < minValue || lightIntensity > maxValue;

    useFocusEffect(
        useCallback(() => {
            const client = mqtt.init();
            mqtt.connect(client, [APIs.LIGHT]);
            client.onMessageArrived = (message) => {
                topic = message.destinationName;
                data = message.payloadString;

                setLightIntensity(parseInt(data));
            };

            Promise.all([
                http.get('adafruit', APIs.LIGHT),
                http.get('server', APIs.LIGHT_INTENSITY_RANGE)
            ]).then(([data, range]) => {
                setLightIntensity(parseInt(data.last_value));
                setMinValue(range.minLightEnergy);
                setMaxValue(range.maxLightEnergy);
                setLoading(false);
            });
        }, [])
    );

    const devices = (
        undefined
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
                    {Strings.LIGHT_INTENSITY}
                </Text>
            </View>
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
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 10
        }}>
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
        loading ? <Loading color={MyTheme.yellow} /> :
        <ControllerLayout
            devices={devices}
            meters={meters}
            settings={settings}
        />
    )
}

export default LightingController;
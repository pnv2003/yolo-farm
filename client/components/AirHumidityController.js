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
import Loading from "./Loading";

const AirHumidityController = () => {
    const [airHumi, setAirHumi] = useState(0);
    const [minValue, setMinValue] = useState(40);
    const [maxValue, setMaxValue] = useState(60);
    const [loading,setLoading] = useState(true);
    const warning = airHumi < minValue || airHumi > maxValue;

    useFocusEffect(
        useCallback(() => {
            const client = mqtt.init();
            mqtt.connect(client, [APIs.AIR_HUMIDITY]);
            client.onMessageArrived = (message) => {
                topic = message.destinationName;
                data = message.payloadString;

                setAirHumi(parseInt(data));
            };

            Promise.all([
                http.get('adafruit', APIs.AIR_HUMIDITY),
                http.get('server', APIs.AIR_HUMI_RANGE)
            ]).then(([data, range]) => {
                setAirHumi(parseInt(data.last_value));
                setMinValue(range.minHumi);
                setMaxValue(range.maxHumi);
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
                    {Strings.AIR_HUMIDITY}
                </Text>
            </View>
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
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
        }}>
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
        loading ? <Loading color={MyTheme.green}/> :
        <ControllerLayout
            devices={devices}
            meters={meters}
            settings={settings}
        />
    )
}

export default AirHumidityController;
import React, { useEffect, useState } from "react";
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import * as Modes from "../constants/mode";
import * as APIs from "../constants/api";
import { StyleSheet, View } from "react-native";
import { faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DeviceToggler from "./DeviceToggler";
import SettingItem from "./SettingItem";
import { Text } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MyTheme } from "../constants/theme";
import Paho from 'paho-mqtt';
import { AIO_KEY, AIO_USERNAME } from "../config/account";
import { AIO_HOST, AIO_PATH, AIO_PORT, mqttClientID } from "../config/connect";

const IrrigationController = () => {

    const [soilMoisture, setSoilMoisture] = useState(0);
    const [pumping, setPumping] = useState(false);
    const soilMoistureMin = 30;
    const soilMoistureMax = 70;
    const mode = Modes.MANUAL;
    const warning = soilMoisture < soilMoistureMin || soilMoisture > soilMoistureMax;

    const client = new Paho.Client(
        AIO_HOST, 
        AIO_PORT, 
        AIO_PATH, 
        mqttClientID()
    );

    client.connect({
        onSuccess: () => {
            console.log("Connected!");
            client.subscribe(APIs.SOIL_MOISTURE);
            client.subscribe(APIs.PUMP);
        },
        onFailure: (error) => {
            console.log("Failed to connect!");
            console.log(error.errorMessage);
        },
        userName: AIO_USERNAME,
        password: AIO_KEY
    })
    client.onMessageArrived = (message) => {
        console.log("Topic: " + message.destinationName);
        console.log("Message: " + message.payloadString);

        topic = message.destinationName;
        data = message.payloadString;
        if (topic === APIs.PUMP) {
            setPumping(data == "1")
        } else if (topic === APIs.SOIL_MOISTURE) {
            setSoilMoisture(parseInt(data));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.devices}>
                <Text style={styles.header}>{Strings.DEVICE}</Text>
                <DeviceToggler 
                    enabled={pumping} 
                    onSwitch={() => {
                        setPumping(prev => !prev);

                        let msg = new Paho.Message(pumping ? 1 : 0);
                        msg.destinationName = APIs.PUMP;
                        client.send(msg);
                    }}
                    disabled={mode !== Modes.MANUAL}
                    color={MyTheme.blue}
                />
            </View>
            <View style={styles.metrics}>
                <Text style={styles.header}>{Strings.METRIC}</Text>
                <View style={styles.meter}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20
                    }}>
                        { warning ? <FontAwesomeIcon icon={faWarning} color={MyTheme.red} size={32}/> : null}
                        <Text style={{ fontSize: 24, color: warning ? MyTheme.red : 'black'}}>{Strings.SOIL_MOISTURE}</Text>
                    </View>                    
                    <AnimatedCircularProgress
                        size={200}
                        width={20}
                        fill={soilMoisture}
                        rotation={0}
                        tintColor={ warning ? MyTheme.red : MyTheme.blue }
                        // onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#CCCCCC">
                            {
                                () => (
                                    <>
                                        <Text style={{ fontSize: 50 }}>
                                            {soilMoisture}
                                        </Text>
                                        <Text style={{ fontSize: 25 }}>%</Text>
                                    </>
                                )
                            } 
                    </AnimatedCircularProgress>
                </View>
            </View>
            <View style={styles.settings}>
                <Text style={styles.header}>{Strings.SETTINGS}</Text>
                <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    gap: 10
                }}>
                    <SettingItem 
                        title={Strings.MODE} 
                        icon={faGear} 
                        target={Headers.PUMP_MODE} 
                        primColor={MyTheme.blue}
                        bgColor={MyTheme.lightblue}
                    >
                        <Text>{Modes.modeTitles[mode]}</Text>
                    </SettingItem>
                    <SettingItem 
                        title={Strings.SCHEDULE} 
                        icon={faCalendar} 
                        disabled={true} 
                        primColor={MyTheme.blue}
                        bgColor={MyTheme.lightblue}>
                        <Text>Not Ready</Text>
                    </SettingItem>
                    <SettingItem 
                        title={Strings.ALLOWED_RANGE} 
                        icon={faWarning}
                        target={Headers.SOIL_MOISTURE_RANGE}
                        primColor={MyTheme.blue}
                        bgColor={MyTheme.lightblue}
                    >
                        <Text>{soilMoistureMin}-{soilMoistureMax}%</Text>
                    </SettingItem>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#C3E6FF'
    },
    devices: {
        flex: 1,
        padding: 20,
        gap: 20,
        // backgroundColor: 'orange',
        borderRadius: 30
    },
    metrics: {
        flex: 3,
        padding: 20,
        gap: 20,
        // backgroundColor: 'skyblue',
        borderRadius: 30
    },
    settings: {
        flex: 1.5,
        padding: 20,
        gap: 20,
        // backgroundColor: 'lightgreen',
        borderRadius: 30
    },
    meter: {
        flex: 1,
        alignItems: 'center',
        gap: 20
    },

    header: {
        fontSize: 30
    }
})

export default IrrigationController;
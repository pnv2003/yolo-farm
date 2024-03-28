import React, { useEffect, useState } from "react";
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import * as Modes from "../constants/mode";
import * as Numbers from "../constants/number";
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
import { sendGetRequest } from "../utils/request";

const IrrigationController = () => {

    const [soilMoisture, setSoilMoisture] = useState(80);
    const [pumping, setPumping] = useState(false);
    const soilMoistureMin = 30;
    const soilMoistureMax = 70;
    const mode = Modes.MANUAL;
    const warning = soilMoisture < soilMoistureMin || soilMoisture > soilMoistureMax;

    useEffect(() => {
        const interval = setInterval(() => {
            sendGetRequest(APIs.pumpFeed, Strings.WATER_PUMP)
                .then((data) => {
                    setPumping(data.last_value == 1);
                });

            sendGetRequest(APIs.soilMoistureFeed, Strings.SOIL_MOISTURE)
                .then((data) => {
                    console.log(data.last_value);
                    setSoilMoisture(parseInt(data.last_value));
                });
        }, Numbers.REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.devices}>
                <Text style={styles.header}>{Strings.DEVICE}</Text>
                <DeviceToggler 
                    enabled={pumping} 
                    setEnabled={setPumping}
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
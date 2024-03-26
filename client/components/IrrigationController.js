import React, { useState } from "react";
import * as Strings from "../constants/string";
import * as Headers from "../constants/header";
import { StyleSheet, Switch, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DeviceToggler from "./DeviceToggler";
import SettingItem from "./SettingItem";

const IrrigationController = () => {

    // to be received from server
    const [pumping, setPumping] = useState(false);
    const soilMoisture = 70;
    const mode = Strings.MANUAL;

    return (
        <View style={styles.container}>
            <View style={styles.devices}>
                <Text style={styles.header}>{Strings.DEVICE}</Text>
                <DeviceToggler 
                    enabled={pumping} 
                    setEnabled={setPumping}
                    disabled={mode !== Strings.MANUAL}
                />
            </View>
            <View style={styles.metrics}>
                <Text style={styles.header}>{Strings.METRIC}</Text>
                <View style={styles.meter}>
                    <Text>{Strings.SOIL_MOISTURE}</Text>
                    <AnimatedCircularProgress
                        size={200}
                        width={20}
                        fill={soilMoisture}
                        rotation={0}
                        tintColor="#00e0ff"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
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
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <SettingItem 
                        title={Strings.MODE} 
                        icon={faGear} 
                        target={Headers.PUMP_MODE} 
                    >
                        <Text>{mode}</Text>
                    </SettingItem>
                    <SettingItem title={Strings.SCHEDULE} icon={faCalendar}>
                        <Text>Hello</Text>
                    </SettingItem>
                    <SettingItem title={Strings.ALLOWED_RANGE} icon={faWarning}>
                        <Text>Hello</Text>
                    </SettingItem>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    devices: {
        flex: 1,
        padding: 20,
        gap: 20
        // backgroundColor: 'skyblue'
    },
    metrics: {
        flex: 3,
        padding: 20,
        gap: 20
        // backgroundColor: 'skyblue'
    },
    settings: {
        flex: 1,
        padding: 20,
        gap: 20
        // backgroundColor: 'lightgreen'
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
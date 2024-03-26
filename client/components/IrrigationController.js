import React, { useState } from "react";
import * as Strings from "../constants/string";
import { Modal, StyleSheet, Switch, Text, View } from "react-native";
// import CircularProgress from "react-native-circular-progress-indicator";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faDroplet, faGear, faWarning } from "@fortawesome/free-solid-svg-icons";

const IrrigationController = () => {

    const [pumping, setPumping] = useState(false);
    const togglePumping = () => {
        setPumping(prev => !prev)
    }

    const [mode, setMode] = useState(Strings.AUTOMATIC);
    const [modeSetting, setModeSetting] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.devices}>
                <Text style={styles.header}>{Strings.DEVICE}</Text>
                <View style={styles.toggler}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        {/* <FontAwesomeIcon icon={faDroplet}/> */}
                        <View>
                            <Text>{Strings.WATER_PUMP}</Text>
                            <Text>{pumping ? Strings.ON : Strings.OFF}</Text>
                        </View>
                    </View>
                    <Switch 
                        trackColor={{
                            false: '#767577',
                            true: '#4195E9'
                        }}
                        thumbColor={'#fff'}
                        ios_backgroundColor={"#3e3e3e"}
                        value={pumping}
                        onValueChange={togglePumping}
                    />
                </View>
            </View>
            <View style={styles.metrics}>
                <Text style={styles.header}>{Strings.METRIC}</Text>
                <View style={styles.meter}>
                    <Text>{Strings.SOIL_MOISTURE}</Text>
                    {/* <CircularProgress 
                        value={60}
                        radius={120}
                        duration={2000}
                        progressValueColor={'#000'}
                        maxValue={200}
                        title={'%'}
                        titleColor={'#000'}
                        titleStyle={{fontWeight: 'bold'}}
                    /> */}
                </View>
            </View>
            <View style={styles.settings}>
                <Text style={styles.header}>{Strings.SETTINGS}</Text>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        {/* <FontAwesomeIcon icon={faGear} size="2x" /> */}
                        <Text>{Strings.MODE}</Text>
                        <Text>{mode}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        {/* <FontAwesomeIcon icon={faCalendar} size="2x" /> */}
                        <Text>Somethin</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        {/* <FontAwesomeIcon icon={faWarning} size="2x" /> */}
                        <Text>Somthin mor</Text>
                    </View>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent
                visible={modeSetting}
                onRequestClose={() => {
                    setModeSetting(!modeSetting);
                }}
            >
                <View>
                    <Text>Hello</Text>
                </View>
            </Modal>
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
    toggler: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 100,
        justifyContent: 'space-between'
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
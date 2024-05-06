import React from "react"
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import * as Strings from '../constants/string';

const ControllerLayout = ({ devices, meters, settings }) => {
    return (
        <View style={styles.container}>
            <View style={styles.devices}>
                <Text style={styles.header}>
                    {Strings.DEVICE}
                </Text>
                {devices}
            </View>
            <View style={styles.metrics}>
                <Text style={styles.header}>
                    {Strings.METRIC}
                </Text>
                {meters}
            </View>
            <View style={styles.settings}>
                <Text style={styles.header}>
                    {Strings.SETTINGS}
                </Text>
                {settings}
            </View>
        </View>
    )
}

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
});

export default ControllerLayout;
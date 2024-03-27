import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ModeItem = ({ title, description, icon, color, selected = false, onPress }) => {
    return (
        <TouchableOpacity 
            style={selected ? styles.selected : styles.container} 
            onPress={onPress}
        >
            <View>
                <FontAwesomeIcon icon={icon} color={color} size={72} />
            </View>
            <View style={styles.desc}>
                <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{title}</Text>
                <Text style={{ fontSize: 16 }}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
    },
    selected: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'lightblue'
    },
    desc: {
        flex: 1
    }
});

export default ModeItem;
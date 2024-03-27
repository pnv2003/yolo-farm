import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const SettingItem = ({children, icon, title, target, disabled, primColor, bgColor}) => {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            // alignItems: 'center',
            padding: 10,
            backgroundColor: bgColor,
            borderStyle: 'solid',
            // borderWidth: 1,
            borderRadius: 20,
        }
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate(target)}
            disabled={disabled}
        >
            <FontAwesomeIcon icon={icon} color={primColor} style={{ alignSelf: 'flex-end' }}/>
            <Text style={{ fontWeight: 'bold', color: primColor }}>{title}</Text>
            {children}
        </TouchableOpacity>
    );
};

export default SettingItem;
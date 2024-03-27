import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const SettingItem = ({children, icon, title, target, disabled}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate(target)}
            disabled={disabled}
        >
            <FontAwesomeIcon icon={icon} color="#0095FF" style={{ alignSelf: 'flex-end' }}/>
            <Text style={{ fontWeight: 'bold', color: '#0095FF' }}>{title}</Text>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // alignItems: 'center',
        padding: 10,
        backgroundColor: '#C3E6FF',
        borderStyle: 'solid',
        // borderWidth: 1,
        borderRadius: 20,
    }
});

export default SettingItem;
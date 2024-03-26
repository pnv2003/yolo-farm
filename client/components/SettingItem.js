import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const SettingItem = ({children, icon, title, target}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => navigation.navigate(target)}
        >
            <FontAwesomeIcon icon={icon} />
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            {children}
        </TouchableOpacity>
    );
};

export default SettingItem;
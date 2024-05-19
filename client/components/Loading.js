import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading = ({ color }) => {
    return (
        <ActivityIndicator 
            animating={true} 
            size={100} 
            color={color} 
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        />
    )
}

export default Loading;
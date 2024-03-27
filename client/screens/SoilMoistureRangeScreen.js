import React, { useState } from "react";
import * as Strings from '../constants/string';
import * as Errors from '../constants/error';
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { MyTheme } from "../constants/theme";

const SoilMoistureRangeScreen = () => {

    const [minValue, setMinValue] = useState("30");
    const [maxValue, setMaxValue] = useState("70");

    function handleSave() {
        console.log(minValue);
        console.log(maxValue);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.desc}>{Strings.SOIL_MOISTURE_RANGE_DESCRIPTION}</Text>
            <View style={styles.inputField}>
                <TextInput 
                    style={styles.input}
                    mode="outlined"
                    label={"Min"}
                    keyboardType="numeric"
                    value={minValue}
                    onChangeText={(text) => setMinValue(parseInt(text))}
                    maxLength={3}
                />
                <HelperText 
                    type="error" 
                    visible={
                        minValue < 0 || 
                        minValue > 100 || 
                        minValue > maxValue
                    }
                >
                    {
                        (minValue == NaN) ? Errors.requiredField() :
                        (minValue > maxValue) 
                            ?   Errors.minMaxError()
                            :   Errors.invalidRange(0, 100)
                    }
                </HelperText>
            </View>
            <View style={styles.inputField}>
                <TextInput 
                    style={styles.input}
                    mode="outlined"
                    label={"Max"}
                    keyboardType="numeric"
                    value={maxValue}
                    onChangeText={(text) => setMaxValue(parseInt(text))}
                    maxLength={3}
                />
                <HelperText 
                    type="error" 
                    visible={
                        maxValue < 0 || 
                        maxValue > 100 || 
                        minValue > maxValue
                    }
                >
                    {
                        (maxValue == NaN) ? Errors.requiredField() :
                        (minValue > maxValue) 
                            ?   Errors.minMaxError()
                            :   Errors.invalidRange(0, 100)
                    }
                </HelperText>
            </View>
            <Button 
                style={{
                    width: '30%',
                    height: 50,
                    justifyContent: 'center'
                }}
                icon={"content-save"} 
                mode="contained"
                onPress={handleSave}
                buttonColor={MyTheme.blue}
            >
                {Strings.SAVE}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 50
    },
    desc: {
        textAlign: 'justify',
        paddingHorizontal: 50,
        marginBottom: 20
    },
    inputField: {
        // flex: 1,
        width: '80%',
        alignItems: 'center'
    },  
    input: {
        height: 75,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '50%',
        fontSize: 36
    },
});

export default SoilMoistureRangeScreen;
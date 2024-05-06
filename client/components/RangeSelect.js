import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import * as Strings from "../constants/string";
import * as Errors from "../constants/error";
import { MyTheme } from "../constants/theme";

const RangeSelect = ({ 
    minValue, 
    maxValue, 
    setMinValue, 
    setMaxValue, 
    onSave,
    minPossible,
    maxPossible,
    unit
}) => {
    // if (!minPossible) {
    //     minPossible = -Infinity;
    // }
    // if (!maxPossible) {
    //     maxPossible = Infinity;
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.desc}>{Strings.SOIL_MOISTURE_RANGE_DESCRIPTION}</Text>
            <View style={styles.inputField}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label={"min (" + unit + ")"}
                    keyboardType="numeric"
                    value={minValue.toString()}
                    onChangeText={(text) => setMinValue(text)}
                    // maxLength={3}
                />
                <HelperText
                    type="error" 
                    visible={
                        minValue < minPossible || 
                        minValue > maxPossible || 
                        minValue > maxValue
                    }
                >
                    {
                        (minValue == NaN) ? Errors.requiredField() :
                        (minValue > maxValue) 
                            ?   Errors.minMaxError()
                            :   Errors.invalidRange(minPossible, maxPossible)
                    }
                </HelperText>
            </View>
            <View style={styles.inputField}>
                <TextInput 
                    style={styles.input}
                    mode="outlined"
                    label={"max (" + unit + ")"}
                    keyboardType="numeric"
                    value={maxValue.toString()}
                    onChangeText={(text) => setMaxValue(parseInt(text))}
                    // maxLength={3}
                />
                <HelperText 
                    type="error" 
                    visible={
                        maxValue < minPossible || 
                        maxValue > maxPossible || 
                        minValue > maxValue
                    }
                >
                    {
                        (maxValue == NaN) ? Errors.requiredField() :
                        (minValue > maxValue) 
                            ?   Errors.minMaxError()
                            :   Errors.invalidRange(minPossible, maxPossible)
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
                onPress={onSave}
                buttonColor={MyTheme.blue}
            >
                {Strings.SAVE}
            </Button>
        </View>
    );
}

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
        // width: '80%',
        alignItems: 'center'
    },  
    input: {
        // height: 75,
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '50%',
        // fontSize: 36
    },
});

export default RangeSelect;
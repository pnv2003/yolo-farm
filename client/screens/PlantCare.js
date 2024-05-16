import React, { useState } from "react";
import { View } from "react-native";
import ExpoCamera from "../components/ExpoCamera";
import { Button, Text } from "react-native-paper";
import * as http from "../utils/http";
import { MyTheme } from "../constants/theme";

const PlantCare = () => {
    const [photo, setPhoto] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState('');

    const onAnalyze = async () => {
        if (photo) {
            setAnalyzing(true);
            try {
                const fileName = photo.split('/').pop();
                const fileType = fileName.split('.').pop();
                const formData = new FormData();
                formData.append('file', {
                    photo,
                    name: fileName,
                    type: `image/${fileType}`
                });

                // TODO: upload to server
                // http.upload('server', 'POST', '/disease', formData)
                //     .then(response => {
                //         console.log(response);
                //     });

                // setTimeout(() => {}, 2000);

                // http.get('server', '/disease')
                //     .then(data => {
                //         setResult(data.disease);
                //         setAnalyzing(false);
                //     });
                
            } catch(e) {
                console.log("Failed to upload photo: " + e);
            }
        } else {
            alert("No photo to upload!");
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            // backgroundColor: '#000'
            // alignItems: 'center'
        }}>
            <ExpoCamera photo={photo} setPhoto={setPhoto}/>
            <Button 
                onPress={onAnalyze}
                disabled={analyzing}
                mode="contained"
                buttonColor={MyTheme.blue}
                style={{
                    alignSelf: 'center',
                    marginTop: 20
                }}
            >
                {analyzing ? "Analyzing..." : "Analyze"}
            </Button>
            <Text style={{
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
                fontSize: 20,
                color: result ? ( result == "None" ? MyTheme.green : MyTheme.red) : MyTheme.darkblue
            }}>
                {
                    analyzing
                    ? "Be patient..."
                    : result
                        ? "Result: " + result
                        : "Press 'Analyze' to start!"
                }
            </Text>
        </View>
    );
}

export default PlantCare;
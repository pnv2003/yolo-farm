import React, { useState } from "react";
import { View } from "react-native";
import ExpoCamera from "../components/ExpoCamera";
import { Button, Text } from "react-native-paper";
import * as http from "../utils/http";

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
                http.upload('server', 'POST', '/disease', formData)
                    .then(response => {
                        console.log(response);
                    });

                http.get('server', '/disease')
                    .then(data => {
                        setResult(data.result);
                        setAnalyzing(false);
                    });
                
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
            alignItems: 'center'
        }}>
            <ExpoCamera photo={photo} setPhoto={setPhoto}/>
            <Button 
                onPress={onAnalyze}
                disabled={analyzing}
            >
                {analyzing ? "Analyzing..." : "Analyze"}
            </Button>
            <Text>
                {
                    result
                        ? "Result: " + result
                        : "Press 'Analyze' to start!"
                }
            </Text>
        </View>
    );
}

export default PlantCare;
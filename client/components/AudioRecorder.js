import React, { useState } from "react";
import { Audio } from 'expo-av';
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const AudioRecorder = () => {
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
  
    async function startRecording() {
      try {
        if (permissionResponse.status !== 'granted') {
          console.log('Requesting permission..');
          await requestPermission();
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
    }
  
    return (
      <View style={styles.container}>
        <Button onPress={recording ? stopRecording : startRecording}>
            {recording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
    }
});

export default AudioRecorder;
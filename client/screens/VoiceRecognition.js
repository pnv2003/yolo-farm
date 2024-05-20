import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import FormData from "form-data";
// import axios from "axios";
import TranscribedOutput from "../components/TranscribeOutput";

export default () => {
  const [URI, setURI] = React.useState("");
  const [recording, setRecording] = React.useState(false);
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [transcribedData, setTranscribedData] = React.useState([]);
  const [interimTranscribedData] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [isTranscribing, setIsTranscribing] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("english");
  const [selectedModel, setSelectedModel] = React.useState(1);
  const [transcribeTimeout, setTranscribeTimout] = React.useState(5);
  const [stopTranscriptionSession, setStopTranscriptionSession] =
    React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const intervalRef = React.useRef(null);

  const stopTranscriptionSessionRef = React.useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = React.useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = React.useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleTranscribeTimeoutChange(newTimeout) {
    setTranscribeTimout(newTimeout);
  }

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        alert("Starting recording..");
        const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
          android: {
            extension: ".mp4",
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };
        const { recording } = await Audio.Recording.createAsync(
          RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        console.log("Recording started");
        setStopTranscriptionSession(false);
        setIsRecording(true);
        intervalRef.current = setInterval(
          transcribeInterim,
          transcribeTimeout * 1000
        );
        console.log("erer", recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error(" Failed to start recording", err);
    }
  }
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setURI(uri);
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
    console.log("Recording stopped and stored at", uri);
    // Fetch audio binary blob data

    clearInterval(intervalRef.current);
    setStopTranscriptionSession(true);
    setIsRecording(false);
    setIsTranscribing(false);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay) * 60;
    const secondDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            {" "}
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
        </View>
      );
    });
  }

  function transcribeInterim() {
    clearInterval(intervalRef.current);
    setIsRecording(false);
  }

  async function transcribeRecording() {
    const uri = URI;
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("audio_data", blob, "temp_recording");
    fetch({
      url: "http://127.0.0.1:8000/api/process",
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        // setTranscribedData((oldData) => [...oldData, response.data]);
        console.log(response.data);
        setLoading(false);
        setIsTranscribing(false);
        intervalRef.current = setInterval(
          transcribeInterim,
          transcribeTimeout * 1000
        );
      })
      .catch(function (error) {
        console.log("error : error");
      });

    if (!stopTranscriptionSessionRef.current) {
      setIsRecording(true);
    }
  }
  return (
    <View style={styles.root}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Speech to Text. </Text>
        <Text style={styles.title}>{message}</Text>
      </View>
      <View style={styles.buttonsSection}>
        {!isRecording && !isTranscribing && (
          <Button onPress={startRecording} title="Start recording" />
        )}
        {(isRecording || isTranscribing) && (
          <Button
            onPress={stopRecording}
            disabled={stopTranscriptionSessionRef.current}
            title="Stop recording"
          />
        )}
        <Button title="Transcribe" onPress={transcribeRecording} />
        {getRecordingLines()}
      </View>

      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          hidesWhenStopped={true}
          animating={true}
        />
      )}

      <View style={styles.transcription}>
        <TranscribedOutput
          transcribedText={transcribedData}
          interimTranscribedText={interimTranscribedData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  title: {
    marginTop: 40,
    fontWeight: "400",
    fontSize: 30,
  },
  settingsSection: {
    flex: 1,
  },
  buttonsSection: {
    flex: 1,
    flexDirection: "row",
  },
  transcription: {
    flex: 1,
    flexDirection: "row",
  },
  recordIllustration: {
    width: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

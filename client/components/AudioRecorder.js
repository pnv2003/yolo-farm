// import React, { useState } from "react";
// import { StyleSheet, View, TextInput, Dimensions } from "react-native";
// import { Button, Text } from "react-native-paper";
// // import { useSpeechRecognition } from 'react-speech-kit';

// const { width } = Dimensions.get("window");
// const buttonWidth = width * 0.7;

// const AudioRecorder = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');

//     // const { listen, listening, stop } = useSpeechRecognition({
//     //     onResult: result => setTranscript(result),
//     // });

//     const handleStartRecording = () => {
//         setIsListening(true);
//         listen();
//     };

//     const handleStopRecording = () => {
//         setIsListening(false);
//         stop();
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Speech to Text Converter</Text>
//             <TextInput
//                 style={styles.textArea}
//                 multiline
//                 editable={false}
//                 value={transcript}
//             />
//             <Button
//                 mode="contained"
//                 style={styles.button}
//                 onPress={isListening ? handleStopRecording : handleStartRecording}
//             >
//                 {isListening ? 'Stop Recording' : 'Start Recording'}
//             </Button>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ecf0f1',
//         paddingHorizontal: 20,
//     },
//     heading: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     textArea: {
//         width: width - 40,
//         height: 200,
//         borderRadius: 12,
//         borderWidth: 2,
//         borderColor: 'cadetblue',
//         marginTop: 25,
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: '#fff',
//     },
//     button: {
//         width: buttonWidth,
//         marginTop: 20,
//         borderRadius: 11,
//     },
// });

// export default AudioRecorder;
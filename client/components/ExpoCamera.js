import { Camera, CameraType } from 'expo-camera/legacy';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { IconButton } from 'react-native-paper';

export default function ExpoCamera({photo, setPhoto}) {
    // const [facing, setFacing] = useState('back');
    // const [permission, requestPermission] = useCameraPermissions();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    // const [photo, setPhoto] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (
            async () => {
                MediaLibrary.requestPermissionsAsync();
                const cameraStatus = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');
            }
        )();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setPhoto(data.uri);
            } catch(e) {
                console.log("Failed to take picture: " + e);
            }
        }
    }

    const savePhoto = async () => {
        if (photo) {
            try {
                await MediaLibrary.createAssetAsync(photo);
                alert('Photo saved!');
                setPhoto(null);
            } catch(e) {
                console.log("Failed to save photo: " + e);
            }

        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    // const ratios = await getSupportedRatioAsync();
    // console.log(ratios);

    return (
        <View style={styles.container}>
            {!photo ? 
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
                ratio={'16:9'}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30
                }}>
                    <IconButton icon={"camera-flip"} size={50} iconColor='#fff' 
                        onPress={() => {
                            setType(
                                type === CameraType.back 
                                ? CameraType.front 
                                : CameraType.back
                            );
                        }}
                    />
                    <IconButton icon={"flash"} size={50} 
                        iconColor={
                            flash === Camera.Constants.FlashMode.off 
                            ? 'gray'
                            : '#f1f1f1'
                        } 
                        onPress={() => {
                            setFlash(
                                flash === Camera.Constants.FlashMode.off
                                ? Camera.Constants.FlashMode.on
                                : Camera.Constants.FlashMode.off
                            );
                        }}
                    />
                </View>
            </Camera> :
            <Image source={{uri: photo}} style={styles.camera}/>
            }
            <View style={styles.button}>
                { photo ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 100
                    }}>
                        <IconButton icon={"camera-retake"} size={50} iconColor='#fff' onPress={() => setPhoto(null)}/>
                        <IconButton icon={"content-save"} size={50} iconColor='#fff' onPress={savePhoto}/>
                    </View>
                :
                <IconButton icon={"camera"} onPress={takePicture} size={50} iconColor='#fff'/>
                }
            </View>
            {/* <Text>hello</Text> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 20
    },
    camera: {
        flex: 1,
        borderRadius: 20
    },
    // buttonContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     backgroundColor: 'transparent',
    //     margin: 64,
    // },
    button: {
        // flex: 1,
        // alignSelf: 'flex-end',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    // text: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: 'white',
    // },
});

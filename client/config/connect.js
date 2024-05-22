import uuid from 'react-native-uuid';

export const AIO_HOST = 'io.adafruit.com';
export const AIO_PORT = Number(80);
export const AIO_PATH = '/mqtt';
export function mqttClientID() {
    return uuid.v4();
}
import Paho from 'paho-mqtt';
import { AIO_HOST, AIO_PATH, AIO_PORT, mqttClientID } from '../config/connect';
import { AIO_KEY, AIO_USERNAME } from '../config/account';

export function init() {
    let client = new Paho.Client(
        AIO_HOST,
        AIO_PORT,
        AIO_PATH,
        "test_id"
    );

    client.onMessageArrived = (message) => {
        console.log("MQTT message arrived: " + message.payloadString);
    }

    client.onConnectionLost = (error) => {
        if (error.errorCode !== 0) {
            console.log("MQTT connection lost: " + error.errorMessage);
        }
    };

    return client;
}

export function connect(client, feeds) {
    client.connect({
        onSuccess: () => {
            console.log("MQTT connection success");
            feeds.forEach((feed) => {
                client.subscribe(feed);
            });
        },
        onFailure: (error) => {
            console.log("MQTT connection failed");
            console.log(error.errorMessage);
        },
        userName: AIO_USERNAME,
        password: AIO_KEY
    })
}

export function publish(client, topic, message) {
    let msg = new Paho.Message(message);
    msg.destinationName = topic;
    client.send(msg);
}

// export function setOnMessageArrived(client, onMessageArrived) {
//     client.onMessageArrived = onMessageArrived;
// }

export function disconnect(client) {
    console.log("MQTT disconnected");
    client.disconnect();
}
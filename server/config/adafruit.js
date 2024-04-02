require("dotenv").config();
const mqtt = require("mqtt");

const connectUrl = "mqtt://io.adafruit.com";
// const username = process.env.ADA_USERNAME || "tranbaophuc423";
// const password = process.env.ADA_PASSWORD || "aio_YwXo71FNhRgm23IgEpEUB4eOwyOb";

class MQTTClient {
    constructor() {
        if (!MQTTClient.instance) {
            this.client = mqtt.connect(connectUrl, {
                username,
                password
            });

            this.client.on("error", (error) => {
                console.error("MQTT client error:", error);
            });

            this.client.on("close", () => {
                console.log("MQTT client disconnected");
            });

            MQTTClient.instance = this;
        }

        return MQTTClient.instance;
    }

    getClient() {
        return this.client;
    }
}

module.exports = new MQTTClient();
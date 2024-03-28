require("dotenv").config();
const mqtt = require("mqtt");

const connectUrl = "mqtt://io.adafruit.com";
const username = "tranbaophuc423";
const password = "aio_qAvS13zs1X6vvgW6usBDDb7OefEB";

const ada = mqtt.connect(connectUrl, {
  username,
  password
});

ada.on("error", (error) => {
  console.error("Error:", error);
  throw error;
});

ada.on("connect", () => {
    console.log("Connected to Adafruit IO");
});

module.exports = ada
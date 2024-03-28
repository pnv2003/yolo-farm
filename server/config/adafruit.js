require("dotenv").config();
const mqtt = require("mqtt");

const connectUrl = "mqtt://io.adafruit.com";
const username = "user"; //thay thế tên user
const password = "key"; //thay thế tên key

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
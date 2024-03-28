require("dotenv").config();
const mqtt = require("mqtt");

const connectUrl = "mqtt://io.adafruit.com";
const username = process.env.ADA_USERNAME;
const password = process.env.ADA_PASSWORD;

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
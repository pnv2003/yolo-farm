const mqttClient = require("../config/adafruit");
const ada = mqttClient.getClient()

function get_humi(callback) {
  ada.on("message", (feed_name, valueLoad) => {
    if(feed_name==process.env.MOI_SENSOR){
      callback(valueLoad.toString());
    }
  });
}

function act_pump() {
  ada.publish(process.env.PUMP_SENSOR, "1", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
    console.log("Pump On");
  });
}

function inact_pump() {
  ada.publish(process.env.PUMP_SENSOR, "0", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
    console.log("Pump Off");
  });
}

module.exports = { get_humi, act_pump, inact_pump };

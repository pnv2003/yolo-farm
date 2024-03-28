const ada = require("../config/adafruit");

const feed_names = ["tranbaophuc423/feeds/bbc-temp", "tranbaophuc423/feeds/bbc-led"];

feed_names.forEach(feed_name => {
  ada.subscribe(feed_name, (err) => {
    if (err) {
      console.error("Error subscribing to feed_name:", err);
      throw err;
    }
    console.log(`Subscribed to ${feed_name} successfully`);
  });
});

function get_humi(callback) {
  ada.on("message", (feed_name, valueLoad) => {
    if(feed_name==feed_names[0]){
      callback(valueLoad.toString());
    }
  });
}

function act_pump() {
  ada.publish(feed_names[1], "1", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
    console.log("Pump On");
  });
}

function inact_pump() {
  ada.publish(feed_names[1], "0", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
    console.log("Pump Off");
  });
}

module.exports = { get_humi, act_pump, inact_pump };

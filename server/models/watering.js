const ada = require("../config/adafruit");

function get_humi() {
  feed_name = "tranbaophuc423/feeds/bbc-temp";

  ada.subscribe(feed_name, (err) => {
    if (err) {
      console.error("Error subscribing to feed_name:", err);
      throw err;
    }
  });

  ada.on("message", (feed_topic, payload) => {
    console.log("Received Message:", feed_topic, payload.toString());
  });

}

function act_pump() {
  feed_name = "tranbaophuc423/feeds/bbc-led";

  ada.subscribe(feed_name, (err) => {
    if (err) {
      console.error("Error subscribing to feed_name:", err);
      throw err;
    }
  });

  ada.publish(feed_name, "1", { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
  });
}

function inact_pump() {
  feed_name = "tranbaophuc423/feeds/bbc-led";

  ada.subscribe(feed_name, (err) => {
    if (err) {
      console.error("Error subscribing to feed_name:", err);
      throw err;
    }
  });

  ada.publish(feed_name, "0", { qos: 1, retain: false }, (error) => {
    if (error) {
      console.error("Error publishing message:", error);
      throw error;
    }
  });
}

module.exports = { get_humi, act_pump, inact_pump };

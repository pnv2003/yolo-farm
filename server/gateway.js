const ada = require("./config/adafruit");

const feed_names = [
  process.env.MOI_SENSOR,
  process.env.PUMP_SENSOR,
  process.env.FAN_SENSOR,
  process.env.LIGHT_SENSOR,
  process.env.HUMID_SENSOR
];

feed_names.forEach(feed_name => {
  ada.subscribe(feed_name, (err) => {
    if (err) {
      console.error("Error subscribing to feed_name:", err);
      throw err;
    }
    console.log(`Subscribed to ${feed_name} successfully`);
  });
});
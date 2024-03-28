const ada = require("./config/adafruit");

const feed_names = [
    ,
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
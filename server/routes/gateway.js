const express = require("express");

const router = express.Router();

router.put("/pumb", (req, res) => {
  if (req.body.pumb == 1) {
    ada.publish(
      process.env.PUMP_SENSOR,
      "1",
      { qos: 1, retain: false },
      (error) => {
        if (error) {
          console.error("Error publishing message:", error);
          throw error;
        }
        console.log("Pump On");
      }
    );
  } else {
    ada.publish(
      process.env.PUMP_SENSOR,
      "0",
      { qos: 1, retain: false },
      (error) => {
        if (error) {
          console.error("Error publishing message:", error);
          throw error;
        }
        console.log("Pump Off");
      }
    );
  }
});

module.exports = router;

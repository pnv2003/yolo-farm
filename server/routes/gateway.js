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

router.put("/fan", (req, res) => {
  if (req.body.fan == 1) {
    ada.publish(
      process.env.FAN_SENSOR,
      "1",
      { qos: 1, retain: false },
      (error) => {
        if (error) {
          console.error("Error publishing message:", error);
          throw error;
        }
        console.log("Fan On");
      }
    );
  } else {
    ada.publish(
      process.env.FAN_SENSOR,
      "0",
      { qos: 1, retain: false },
      (error) => {
        if (error) {
          console.error("Error publishing message:", error);
          throw error;
        }
        console.log("Fan Off");
      }
    );
  }
});
module.exports = router;

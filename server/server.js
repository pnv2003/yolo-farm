const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mqttClient = require("./config/adafruit");
const axios = require('axios');
require('./db');

// Import routes
const apiRouter = require('./routes');

// App setup for request port
const requestApp = express();
const requestPort = process.env.REQUEST_PORT || 8080;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

requestApp.use(express.static('public'));
requestApp.use(express.urlencoded({ extended: true }));
requestApp.use(express.json());
requestApp.use(cors(corsOptions));
requestApp.use(bodyParser.json());

// Every route should start with /api
requestApp.use('/api', apiRouter);

// Error handler for request port
requestApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server đang bị lỗi. Vui lòng thử lại sau!');
});

// Listen for requests on requestPort
requestApp.listen(requestPort, () => {
  console.log(`Request server running on port ${requestPort}...`);
});

/* --------------------------------------------------------------------- */

// App setup for gateway port
const gatewayApp = express();
const gatewayPort = process.env.GATEWAY_PORT || 8081;

gatewayApp.use(express.static('public'));
gatewayApp.use(express.urlencoded({ extended: true }));
gatewayApp.use(express.json());
gatewayApp.use(cors(corsOptions));
gatewayApp.use(bodyParser.json());

gatewayApp.post('/mqtt-data', (req, res) => {
  const { feed_name, valueLoad } = req.body;

  console.log(`Received message for ${feed_name}: ${valueLoad}`);

  res.status(200).send('Data received successfully');
});

gatewayApp.listen(gatewayPort, () => {
  console.log(`Gateway server running on port ${gatewayPort}`);

  const ada = mqttClient.getClient();
  const feed_names = [
    process.env.MOI_SENSOR,
    process.env.PUMP_SENSOR,
    process.env.FAN_SENSOR,
    process.env.LIGHT_SENSOR,
    process.env.HUMID_SENSOR,
    process.env.TEMP_SENSOR
  ];

  feed_names.forEach(feed_name => {
    ada.subscribe(feed_name, (err) => {
      if (err) {
        console.error("Error subscribing to", feed_name, ":", err);
        throw err;
      }
      console.log(`Subscribed to ${feed_name} successfully`);
    });
  });

  ada.on("message", (feed_name, valueLoad) => {
    // axios.post(`http://localhost:${gatewayPort}/mqtt-data`, { feed_name, valueLoad })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error sending MQTT data to Express endpoint:', error);
    //   });
  });
});
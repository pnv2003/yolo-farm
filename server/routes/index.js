const express = require('express');
const watering = require('./watering');
const temperature = require('./temperature');
const airHumidity = require('./airHumidity');
const light = require('./light');

const router = express.Router();

router.use('/watering', watering);
router.use('/temperature', temperature);
router.use('/air-humidity', airHumidity);
router.use('/light', light);

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

module.exports = router;
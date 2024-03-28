const express = require('express');
const watering = require('./watering');

const router = express.Router();

router.use('/watering', watering);

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

module.exports = router;
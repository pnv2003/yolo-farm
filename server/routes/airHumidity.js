const express = require('express');
const router = express.Router();
const airHumiController = require('../controllers/airHumiController');


router.get('/air-humi', airHumiController.getHumi);

router.put('/air-humi', airHumiController.setHumi);

router.get('/mode', airHumiController.getMode);

router.put('/mode', airHumiController.setMode);

router.get('/min-max-air-humi', airHumiController.getMinMaxHumi);

router.put('/min-max-air-humi', airHumiController.setMinMaxHumi);


module.exports = router;
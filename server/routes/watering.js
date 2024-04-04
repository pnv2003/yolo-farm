const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');


router.get('/moisture', waterController.getMoisture);

router.post('/moisture', waterController.setMoisture);

router.get('/mode', waterController.getMode);

router.post('/mode', waterController.setMode);

router.get('/min-max-moisture', waterController.getMinMaxMoisture);

router.post('/min-max-moisture', waterController.setMinMaxMoisture);


module.exports = router;
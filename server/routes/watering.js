const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');


router.get('/moisture', waterController.getMoisture);

router.post('/moisture', waterController.setMoisture);

router.get('/mode', waterController.getMode);

router.post('/mode', waterController.setMode);

router.get('/min-moisture', waterController.getMinMoisture);

router.post('/min-moisture', waterController.setMinMoisture);

router.get('/max-moisture', waterController.getMaxMoisture);

router.post('/max-moisture', waterController.setMaxMoisture);


module.exports = router;
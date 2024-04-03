const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');


router.get('/get-moisture', waterController.getMoisture);

router.post('/post-moisture', waterController.setMoisture);

router.get('/get-mode', waterController.getMode);

router.post('/post-mode', waterController.setMode);

router.get('/get-min-moisture', waterController.getMinMoisture);

router.post('/post-min-moisture', waterController.setMinMoisture);

router.get('/get-max-moisture', waterController.getMaxMoisture);

router.post('/post-max-moisture', waterController.setMaxMoisture);


module.exports = router;
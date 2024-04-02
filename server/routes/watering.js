const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');


router.get('/get-moisture', waterController.getMoisture);

router.post('/post-moisture', waterController.setMoisture);

router.get('/get-mode', waterController.getMode);

router.post('/post-mode', waterController.setMode);


module.exports = router;
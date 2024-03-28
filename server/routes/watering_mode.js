const express = require('express');
const router = express.Router();
const watering = require('../controllers/waterController');

router.post('/water', waterController.changeMode);

module.exports = router;


module.exports = router;
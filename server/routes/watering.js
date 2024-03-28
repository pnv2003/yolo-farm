const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');

router.post('/waterMode', waterController.changeMode);

module.exports = router;
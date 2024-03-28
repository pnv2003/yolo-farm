const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');

router.post('/water', waterController.changeMode);

module.exports = router;
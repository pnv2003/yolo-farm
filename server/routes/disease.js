const express = require('express');
const router = express.Router();
const diseaseDetection = require('../controllers/diseaseDetection');


router.get('/', diseaseDetection.getDisease);

module.exports = router;
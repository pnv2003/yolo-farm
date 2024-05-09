const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');


router.get('/moisture', waterController.getMoisture);

router.put('/moisture', waterController.setMoisture);

router.get('/mode', waterController.getMode);

router.put('/mode', waterController.setMode);

router.get('/min-max-moisture', waterController.getMinMaxMoisture);

router.put('/min-max-moisture', waterController.setMinMaxMoisture);

router.get('/task', waterController.getScheduleTask);

router.post('/task', waterController.createTask);

router.put('/task/:id', waterController.updateTask);

router.delete('/task/:id', waterController.deleteTask);

router.delete('/task', waterController.deleteAllTasks);

module.exports = router;
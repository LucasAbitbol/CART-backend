const sensorDataCtrl = require('../controllers/sensorData')
const express = require("express");
const router = express.Router();

router.post("/sensorData", homeCtrl.createSensorData);

module.exports = router;
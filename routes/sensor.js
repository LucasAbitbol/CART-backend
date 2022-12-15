const sensorCtrl = require('../controllers/sensor')
const express = require("express");
const router = express.Router();

router.post("/sensor", sensorCtrl.createSensor);

module.exports = router;
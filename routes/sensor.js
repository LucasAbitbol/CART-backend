const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const sensorCtrl = require('../controllers/sensor');
    
router.get('/index', auth, sensorCtrl.getAddSensorPage);
router.get("/add_sensor", auth, sensorCtrl.addSensor);
router.get("/request", sensorCtrl.getSensorDetails);
router.post("/:id/editSensor", auth, sensorCtrl.editSensor); // needs to be a PUT
router.post("/updateSensor", sensorCtrl.updateSensor); // needs to be a PUT (what's the difference between edit and update ?)
router.delete('/:id', sensorCtrl.deleteSensor);

module.exports = router;
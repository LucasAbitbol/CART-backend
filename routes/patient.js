const patientCtrl = require('../patient/home')
const express = require("express");
const router = express.Router();

router.post("/patient", patientCtrl.createPatient);

module.exports = router;
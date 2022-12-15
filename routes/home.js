const homeCtrl = require('../controllers/home')
const express = require("express");
const router = express.Router();

router.post("/home", homeCtrl.createHome);

module.exports = router;
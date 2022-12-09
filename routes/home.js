const homeCtrl = require('../controllers/home')
const express = require("express");
const router = express.Router();

router.get("/add_home", homeCtrl.getSetupPage);
router.post("/add_home", homeCtrl.createHome);

module.exports = router;
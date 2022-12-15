const roomCtrl = require('../controllers/room')
const express = require("express");
const router = express.Router();

router.post("/room", roomCtrl.createRoom);

module.exports = router;
var mongoose = require("mongoose");

// Declare schema
var roomSchema = new mongoose.Schema({
    roomId: {type: Number, required: true},
    homeId: {type: Number, required: true},
    roomType: {type: String}
});

module.exports = mongoose.model("Room", roomSchema);
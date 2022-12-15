var mongoose = require("mongoose");

// Declare schema
var sensorSchema = new mongoose.Schema({
    sensorId: {type: String, required: true},
    roomId: {type: Number, required: true},
    sensorType: {type: String},
    sensorName: {type: String}
});

module.exports = mongoose.model("Sensor", sensorSchema);

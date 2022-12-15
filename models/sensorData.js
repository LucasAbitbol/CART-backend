var mongoose = require("mongoose");

// Declare schema
var sensorDataSchema = new mongoose.Schema({
    sensorId: {type: String, required: true},
    isActive: {type: Boolean},
    date: {type: Date}
});

module.exports = mongoose.model("SensorData", sensorDataSchema);
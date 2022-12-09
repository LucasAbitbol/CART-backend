var mongoose = require("mongoose");

// Declare schema
var sensorSchema = new mongoose.Schema({
    sensor_id: {type: String, required: true, index: {unique: true}},
    home_write_key: {type: String, required: true},
    home_read_key: {type: String, required: true},
    sensor_type: {type: String, required: true},
    sensor_location: {type: String, required: true}
});

// Export schema ("sensor_info" - is name of DB)
module.exports = mongoose.model("Sensor", sensorSchema);

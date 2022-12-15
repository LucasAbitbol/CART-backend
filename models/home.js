var mongoose = require("mongoose");

// Declare schema
var homeSchema = new mongoose.Schema({
    homeId: {type: Number, required: true},
    patientId: {type: Number, required: true},
    address: {type: String},
    city: {type: String}
});

module.exports = mongoose.model("Home", homeSchema);
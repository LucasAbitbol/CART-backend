var mongoose = require("mongoose");

// Declare schema
var patientSchema = new mongoose.Schema({
    patientId: {type: Number, required: true},
    sex: {type: String},
    firstName: {type: String},
    secondName: {type: String},
    email: {type: String},
    phone: {type: Number}
});

module.exports = mongoose.model("Patient", patientSchema);
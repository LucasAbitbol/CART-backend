var mongoose = require("mongoose");

// Declare schema
var homeSchema = new mongoose.Schema({
    home_read_key: {type: String, required: true},
    home_write_key: {type: String, required: true},
    entries_number: {type: Number},
    owner_firstname: {type:String},
    owner_lastname: {type:String},
    owner_email: {type:String},
    createdBy: {type:String},
    home_address: {
        home_number:{type:Number},
        street:{type:String},
        city:{type:String},
        region:{type:String},
        post_code:{type:String},
        telephone: {type: String},
        email: {type: String},
    },
    IOThings_Connected_Home:{}
});

// Export schema ("sensor_info" - is name of DB)
module.exports = mongoose.model("Home", homeSchema);
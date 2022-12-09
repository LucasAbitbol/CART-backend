const sensor = require('../models/sensor');
const home = require('../models/home');
    
const homes = ["Living Room", 
                        "Kitchen", 
                        "Landing", 
                        "Stairway", 
                        "Hallway",
                        "Master Bedroom", 
                        "Second Bedroom", 
                        "Third Bedroom", 
                        "Forth Bedroom",
                        "Master Bedroom Toilet",
                        "Garage", 
                        "Garden"];

const sensor_types = ["Light", 
                 "Led Light", 
                 "Led Strip Light",
                 "Door Lock", 
                 "Motion Sensor",
                 "Tempreature"];
                 
                 
const sensors_types = ["Light", 
                 "Led Light", 
                 "Led Strip Light",
                 "Door Lock", 
                 "Motion Sensor",
                 "Tempreature"];

exports.getAddSensorPage = function(req, res, next) {
    var session_user = req.session.user.name;
    var errorMessage = req.session.error;
    var successMessage = req.session.success;

    // since messages have been served, delete from session
    delete req.session.error;
    delete req.session.success;
    delete req.session.user.name;
    
    //sensor.jade
    res.render("sensor/add_sensor", {
        rooms: homes,
        sensor_type: sensor_types,
        errorMessage: errorMessage
    });
};

/* Views controllers */
exports.deleteSensor =  function(req, res, next) {
    sensor.findByIdAndRemove({_id:req.params.id}, function(err, sensor){
        if (err) {
            console.log("Error retrieving sensor " + err);
            req.session.error = "A problem occured retrieving the sensor." + req.pramas.id;
            res.redirect("sensor/menu_sensor");
        } else{
            console.log("DELETE sensor with ID: " + sensor._id);
            req.session.success = "Deleted successully.";
            req.session.sensor = sensor;
            res.redirect("/index");
        }
    });    
};

exports.updateSensor = function(req, res) {
    // Get values from request arguments
    var sensor_id = req.body.iothings_sensor_id;
    delete req.body.sensorID;
    var home_write_key = req.body.home_write_key;
    delete req.body.home_write_key;
    var home_sensor_location = req.body.sensor_HomeSensor_Location;
    var home_sensor_type = req.body.sensor_HomeSensor_Type;
    var errorMessage = req.session.error;
    home.findOne({
        home_write_key:home_write_key
    }, function(err, dataset) {
        if (err) {
            console.log("Error retrieving dataset: " + err);
            res.sendStatus(-1);
        } else if (dataset) {
            // Strip dataset from sensible informations (_id and API keys)
            var cleanDataset = [{
                owner_name: dataset.owner_name,
                name: dataset.owner_name,
                email: dataset.owner_email,
                address: [dataset.home_address],
                data2: [
                    [12, 1888],
                    [33, 5555]
                ],
               // data: dataset.IOThings_Connected_Home.landing.sensor.B037A2ART001N.values
            }]
            console.log(dataset)
            // return dataset as json
            //res.setHeader('Content-Type', 'application/json');

            //res.send(cleanDataset);
            sensor.create({
                sensor_id: sensor_id,
                home_write_key: home_write_key,
                home_read_key: dataset.home_read_key,
                sensor_type: home_sensor_type,
                sensor_location: home_sensor_location,
            }, function(err, user) {
                if (err) {
                    console.log("Error entering sensor information " + err);

                } else {
                    console.log("Sensor information entered");
                }
            });
        } else {
            console.log("No dataset found for this API key: ????");
            res.sendStatus(0);
        }
    });
    console.log(sensor_id, home_write_key, home_sensor_location, home_sensor_type);
   // console.log(homes.one_bedroom_house[2]);
    res.render("sensor/add_sensor", {
        rooms: homes,
        sensor_type: sensor_types,
        errorMessage: errorMessage
    });
};

// GET request to get data
exports.getSensorDetails = function(req, res) {
    // Get values from request arguments
    var apiKey = req.query.key;
    // Find dataset by read API key
    home.findOne({home_read_key: apiKey}, function(err, home_sensor) {
        if (err) {
            console.log("Error retrieving dataset: " + err);
            res.sendStatus(-1);
        } else if (home_sensor) {
            // Strip dataset from sensible informations (_id and API keys)
            var cleanDataset = {owner_name: home_sensor.owner_name,
                                owner_email : home_sensor.owner_email
                                }
            // return dataset as json
            res.json(cleanDataset);
        } else {
            console.log("No dataset found for this API key: " + apiKey);
            res.sendStatus(0);
        }
    });
};


//Edit sensor by ID
exports.editSensor = function(req, res) {
    // Get values from the POST request
    var newSensorId = req.body.iothings_new_sensor_id;
    var newHomeWriteKey = req.body.iothings_new_home_write_key;
    var newSensorType = req.body.iothings_new_sensor_type;
    var newSensorLocation = req.body.iothings_new_sensor_location ;

    // Delete the values from the request body so that we only keep information about the variables
    delete req.body.iothings_new_sensor_id;
    delete req.body.iothings_new_home_write_key;
    delete req.body.iothings_new_sensor_type;
    delete req.body.iothings_new_sensor_location;

    var updateQuery = {};
    
    sensor.findById(req.params.id, function(err, sensor) {
        if (err) {
            console.log("Error retrieving sensor " + err);
            req.session.error = "A problem occured retrieving the sensor.";
            res.redirect("/menu_sensor");
        } else {
            home.find({home_write_key:newHomeWriteKey}, function(err, home){
                if(err){
                    console.log("Error finding home " + err);
                    req.session.error = "A problem occured finding the home.";
                    res.redirect("/index");
                } else{
                    updateQuery = {
                        sensor_id: newSensorId,
                        home_write_key: newHomeWriteKey,
                        sensor_type: newSensorType,
                        sensor_location: newSensorLocation,
                    }
                    // Update dataset
                    sensor.update(updateQuery, function(err, response) {
                        if (err) {
                            console.log("Error updating dataset: " + err);
                            req.session.error = "Update failed, please try again.";
                        } else {
                            console.log("Update on dataset: " + sensor._id);
                            req.session.success = "Update successul.";
                            req.session.sensor = sensor;
                        }
                        res.redirect("/index");
                    });
                }
            }
            );
        }
        
    }); 

};

exports.addSensor = function(req, res, next) {
    var session_user = req.session.user.name;
    var errorMessage = req.session.error;
    var successMessage = req.session.success;

    // since messages have been served, delete from session
    delete req.session.error;
    delete req.session.success;
    delete req.session.user.name;
    
    //sensor.jade
    res.render("sensor/add_sensor", {
        rooms: homes,
        sensor_type: sensors_types,
        errorMessage: errorMessage
    });

};
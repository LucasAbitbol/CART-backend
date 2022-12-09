const hat = require("hat");
const home = require('../models/home');
const mailSender = require('../controllers/mailSender');


exports.getSetupPage = function(req, res) {
    res.render("home/add_home");
};

exports.createHome = function(req, res) {
    console.log("Enterring");
    var errorMessage = req.session.error;
    
    var iothings_homeowner_firstname = req.body.iothings_homeowner_firstname;
    delete req.body.iothings_homeowner_firstname;
    var iothings_homeowner_lastname = req.body.iothings_homeowner_lastname;
    delete req.body.iothings_homeowner_lastname;
    
    var iothings_address_house_number = req.body.iothings_address_number;
    delete req.body.iothings_address_house_number;
    var iothings_address_street = req.body.iothings_address_street;
    delete req.body.iothings_address_street;
    var iothings_address_city = req.body.iothings_address_city;
    delete req.body.iothings_address_city;
    var iothings_address_region = req.body.iothings_address_region;
    delete req.body.iothings_address_region;
    var iothings_address_postcode = req.body.iothings_address_postcode;
    delete req.body.iothings_address_postcode;
    
    var iothings_telephone_areacode = req.body.iothings_telephone_areacode;
    delete req.body.iothings_telephone_areacode;
    var iothings_phone_number = req.body.iothings_phone_number;
    delete req.body.iothings_phone_number;
    
    var iothings_email = req.body.iothings_email;
    delete req.body.iothings_email;
    var errorMessage = req.session.error;
    var homeId = hat();
    home.create({
        home_read_key: homeId,
        home_write_key: homeId,
        entries_number: 0,  
        owner_firstname: iothings_homeowner_firstname,
        owner_lastname: iothings_homeowner_lastname,
        owner_email: iothings_email,
        home_address: {
            house_number:iothings_address_house_number,
            street: iothings_address_street,
            city: iothings_address_city,
            region: iothings_address_region,
            post_code: iothings_address_postcode,
            telephone: iothings_telephone_areacode + iothings_phone_number,
          //  email: iothings_email,
        },
        IOThings_Connected_Home :{
            Hallway:{
                sensors:{
                
                         }
                     }
            
        }
    }, function(err, home_info) {
        if (err) {
            console.log("Error entering sensor information " + err);

        } else {
            console.log("New home added");
/*            var myHome = home.find({home_write_key:homeId}).exec();
            console.log(myHome);
            var myId = myHome._id;*/
            mailSender.homeCreated(iothings_homeowner_firstname, iothings_email, homeId);
        }
    });
res.render("home/add_home");
    
};
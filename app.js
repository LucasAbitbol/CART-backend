var express = require("express"),
    mongoose = require("mongoose");

// Start app
var app = express();

mongoose.connect(
    "mongodb://localhost/cartdb",
    () => {
        console.log("Connected to DB")
    },
    e => console.error(e)
);
module.exports = app;
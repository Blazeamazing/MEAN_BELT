var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var session = require("express-session");

app.use(session({
    secret: "fuckangular",
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
var path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist')));


require('./server/config/mongoose.js');

const routes_setter = require("./server/config/routes.js");
routes_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
})
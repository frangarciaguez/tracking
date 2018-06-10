var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// load routes
var product_routes = require('./routes/product');

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// config http headers

// base routes
app.use('/api', product_routes);

module.exports = app;
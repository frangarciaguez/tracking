var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// load routes
var product_routes = require('./routes/product');
var item_routes = require('./routes/item');
var dailyItemUpdate_routes = require('./routes/dailyItemUpdate');
var seller_routes = require('./routes/seller');
var user_routes = require('./routes/user');

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// config http headers

// base routes
app.use('/api', product_routes);
app.use('/api', item_routes);
app.use('/api', dailyItemUpdate_routes);
app.use('/api', seller_routes);
app.use('/api', user_routes);

module.exports = app;
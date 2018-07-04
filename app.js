var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// load routes
var product_routes = require('./routes/product');
var item_routes = require('./routes/item');
var itemUpdate_routes = require('./routes/itemUpdate');
var seller_routes = require('./routes/seller');
var user_routes = require('./routes/user');

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// config http headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY. Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	
	next();
});

// base routes
app.use('/api', product_routes);
app.use('/api', item_routes);
app.use('/api', itemUpdate_routes);
app.use('/api', seller_routes);
app.use('/api', user_routes);

module.exports = app;
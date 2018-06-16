var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

api.get('/test', ProductController.test);
api.post('/saveProduct', ProductController.saveProduct);
api.get('/getProduct/:id', ProductController.getProduct);

module.exports = api;
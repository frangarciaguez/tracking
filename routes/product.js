var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

api.get('/test', ProductController.test);

module.exports = api;
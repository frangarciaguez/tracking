var express = require('express');
var SellerController = require('../controllers/seller');

var api = express.Router();

api.get('/test', SellerController.test);
api.post('/saveSeller', SellerController.saveSeller);
api.post('/getSeller/:id', SellerController.getSeller);

module.exports = api;
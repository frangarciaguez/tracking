var express = require('express');
var ebayController = require('../controllers/ebay');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/ebay/item/:id', ebayController.getEbayItem);
api.post('/ebay/itemUpdate/:id', ebayController.getEbayItemUpdate);

module.exports = api;
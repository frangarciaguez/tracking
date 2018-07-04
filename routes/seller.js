var express = require('express');
var SellerController = require('../controllers/seller');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/testSellerController', SellerController.test);
api.post('/seller', SellerController.saveSeller);
api.get('/seller/:id', SellerController.getSeller);
api.get('/sellers/:page?', md_auth.ensureAuth, SellerController.getSellers);
api.delete('/seller/:id', md_auth.ensureAuth, SellerController.deleteSeller);
api.put('/seller/:id', md_auth.ensureAuth, SellerController.updateSeller);

module.exports = api;
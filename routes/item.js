var express = require('express');
var ItemController = require('../controllers/item');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.get('/testItemController', md_auth.ensureAuth, ItemController.test);
api.post('/item', md_auth.ensureAuth, ItemController.saveItem);
api.get('/item/:id', md_auth.ensureAuth, ItemController.getItem);
api.get('/items/:page?', md_auth.ensureAuth, ItemController.getItems);
api.delete('/item/:id', md_auth.ensureAuth, ItemController.deleteItem);
api.put('/item/:id', md_auth.ensureAuth, ItemController.updateItem);

module.exports = api;
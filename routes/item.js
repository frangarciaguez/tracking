var express = require('express');
var ItemController = require('../controllers/item');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.get('/testItemController', ItemController.test);
api.post('/item', md_auth.ensureAuth, ItemController.saveItem);
api.get('/item/:id', ItemController.getItem);
api.get('/items/:page?', ItemController.getItems);
api.delete('/item/:id', md_auth.ensureAuth, ItemController.deleteItem);
api.put('/item/:id', md_auth.ensureAuth, ItemController.updateItem);

module.exports = api;
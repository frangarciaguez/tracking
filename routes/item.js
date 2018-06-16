var express = require('express');
var ItemController = require('../controllers/item');

var api = express.Router();

api.get('/test', ItemController.test);
api.post('/saveItem', ItemController.saveItem);
api.get('/getItem/:id', ItemController.getItem);

module.exports = api;
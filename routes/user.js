var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/test', UserController.test);
api.post('/saveUser', UserController.saveUser);
api.get('/getUser/:id', UserController.getUser);

module.exports = api;
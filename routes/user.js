var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/testUserController', md_auth.ensureAuth, UserController.test);
api.post('/register', md_auth.ensureAuth, UserController.saveUser);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.post('/login', UserController.loginUser);
api.put('/updateUser/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/uploadUserAvatar/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/getUserAvatar/:imageFile', md_auth.ensureAuth, UserController.getImageFile);

module.exports = api;
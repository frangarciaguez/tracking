var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/products'});

api.get('/test', md_auth.ensureAuth, ProductController.test);
api.post('/product', md_auth.ensureAuth, ProductController.saveProduct);
api.get('/product/:id', md_auth.ensureAuth, ProductController.getProduct);
api.get('/products/:page?', md_auth.ensureAuth, ProductController.getProducts);
api.delete('/product/:id', md_auth.ensureAuth, ProductController.deleteProduct);
api.put('/product/:id', md_auth.ensureAuth, ProductController.updateProduct);
api.post('/productImage/:id', [md_auth.ensureAuth, md_upload], ProductController.uploadImage);
api.get('/productImage/:imageFile', md_auth.ensureAuth, ProductController.getImageFile);

module.exports = api;
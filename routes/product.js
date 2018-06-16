var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

api.get('/test', ProductController.test);
api.post('/product', ProductController.saveProduct);
api.get('/product/:id', ProductController.getProduct);
api.get('/products/:page?', ProductController.getProducts);
api.delete('/product/:id', ProductController.deleteProduct);
api.put('/product/:id', ProductController.updateProduct);

module.exports = api;
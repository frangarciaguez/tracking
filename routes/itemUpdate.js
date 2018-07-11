var express = require('express');
var itemUpdateController = require('../controllers/itemUpdate');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.get('/test', md_auth.ensureAuth, itemUpdateController.test);
api.post('/itemUpdate', md_auth.ensureAuth, itemUpdateController.saveItemUpdate);
api.get('/itemUpdate/:id', md_auth.ensureAuth, itemUpdateController.getItemUpdate);
api.get('/itemUpdates/:page?', itemUpdateController.getItemUpdates);
api.get('/itemUpdatesByItem/items/:itemsPerPage/page/:page/item/:item', md_auth.ensureAuth, itemUpdateController.getItemUpdatesByItem);
api.delete('/itemUpdate/:id', md_auth.ensureAuth, itemUpdateController.deleteItemUpdate);
api.put('/itemUpdate/:id', md_auth.ensureAuth, itemUpdateController.updateItemUpdate);

module.exports = api;
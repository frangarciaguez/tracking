var express = require('express');
var DailyItemUpdateController = require('../controllers/dailyItemUpdate');

var api = express.Router();

api.get('/test', DailyItemUpdateController.test);
api.post('/saveDailyItemUpdate', DailyItemUpdateController.saveDailyItemUpdate);
api.get('/getDailyItemUpdate/:id', DailyItemUpdateController.getDailyItemUpdate);

module.exports = api;
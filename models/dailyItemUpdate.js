var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailyItemUpdateSchema = Schema({
	timestamp: String,
	quantity: String,
	quantitySold: String,
	price: String,
	allInfo: String,
	item: { type: Schema.ObjectId }
});

module.exports = mongoose.model('DailyItemUpdate', DailyItemUpdateSchema);
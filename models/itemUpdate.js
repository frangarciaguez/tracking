var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemUpdateSchema = Schema({
	timestamp: String,
	quantity: String,
	quantitySold: String,
	price: { type: Object() },
	item: { type: Schema.ObjectId },
	product: { type: Schema.ObjectId },
	seller: { type: Schema.ObjectId },
	source: String,
	allInfo: { type: Object() }
});

module.exports = mongoose.model('ItemUpdate', ItemUpdateSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
	title: String,
	url: String,
	info: String,
	image: String,
	category: String,
	product: { type: Schema.ObjectId },
	seller: { type: Schema.ObjectId }
});

module.exports = mongoose.model('Item', ItemSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
	title: String,
	url: String,
	info: String,
	mainPicture: String,
	category: String,
	product: { type: Schema.ObjectId },
	seller: { type: Schema.ObjectId },
	source: String,
	externalID: String
});

module.exports = mongoose.model('Item', ItemSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SellerSchema = Schema({
	name: String,
	url: String,
	address: String,
	email: String,
	phone: String,
	source: String,
	externalID: String
});

module.exports = mongoose.model('Seller', SellerSchema);
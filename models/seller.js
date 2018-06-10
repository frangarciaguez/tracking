var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SellerSchema = Schema({
	name: String,
	url: String,
	address: String,
	email: String,
	phone: String,
});

module.exports = mongoose.model('Seller', SellerSchema);
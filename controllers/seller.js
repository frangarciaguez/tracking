var Seller = require('../models/seller');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveSeller(req,res){
	var seller = new Seller();
	
	var params = req.body;
	
	seller.name = params.name;
	seller.url = params.url;
	seller.address = params.address;
	seller.email = params.email;
	seller.phone = params.phone;
	seller.source = params.source;
	seller.externalID = params.externalID;
}

function getSeller(req,res){
	var sellerId = req.params.id;
	
	Seller.findById(sellerId, (err,seller) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!product){
				res.status(404).send({message: 'Seller not found'});
			}else{
				res.status(200).send({seller});
			}
		}
	});
}

module.exports = {
	test,
	saveSeller,
	getSeller
};
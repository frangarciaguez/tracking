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
	
	seller.save((err,sellerStored) => {
		if(err){
			res.status(500).send({message: 'Error on the server: the seller has not been saved.'});
		}else{
			if(!sellerStored){
				res.status(404).send({message: 'The seller has not been saved.'});
			}else{
				res.status(200).send({seller: sellerStored});
			}
		}
	});
}

function getSeller(req,res){
	var sellerId = req.params.id;
	
	Seller.findById(sellerId, (err,seller) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!seller){
				res.status(404).send({message: 'Seller not found'});
			}else{
				res.status(200).send({seller});
			}
		}
	});
}

function deleteSeller(req,res){
	var sellerId = req.params.id;
	
	Seller.findByIdAndDelete(sellerId,(err,removedSeller) => {
		if(err){
			res.status(500).send({message:"Server error: the seller could not be removed."});
		}else{
			if(!removedSeller){
				res.status(404).send({message:"The seller could not be removed."});
			}else{
				res.status(200).send({removedSeller});
			}
		}
	});
}

function updateSeller(req,res){
	var sellerId = req.params.id;
	var update = req.body;
	
	Seller.findByIdAndUpdate(sellerId, update, (err, updatedSeller) => {
		if(err){
			res.status(500).send({message:"Server error: the seller could not be updated."});
		}else{
			if(!updatedSeller){
				res.status(404).send({message:"The seller could not be updated."});
			}else{
				res.status(200).send({
					updatedSeller:updatedSeller,
					update:update
				});
			}
		}
	});
}

function getSellers(req,res){
	var page = 1;
	var itemsPerPage = 3;
	if(req.params.page){
		page = req.params.page;
	}
	
	Seller.find().sort('name').paginate(page, itemsPerPage, function(err,sellers,total){
		if(err){
			res.status(500).send({message: 'Request error.'});
		}else{
			if(!sellers){
				res.status(404).send({message: 'There are no sellers.'});
			}else{
				return res.status(200).send({
					totalItems: total,
					sellers: sellers
				});
			}
		}
	});
}

module.exports = {
	test,
	saveSeller,
	getSeller,
	deleteSeller,
	updateSeller,
	getSellers
};
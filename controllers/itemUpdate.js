var ItemUpdate = require('../models/itemUpdate');
var mongoosePaginate = require('mongoose-pagination');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveItemUpdate(req,res){
	var itemUpdate = new ItemUpdate();
	
	var params = req.body;
	
	itemUpdate.timestamp = params.timestamp;
	itemUpdate.quantity = params.quantity;
	itemUpdate.quantitySold = params.quantitySold;
	itemUpdate.price = params.price;
	itemUpdate.allInfo = params.allInfo;
	itemUpdate.source = params.source;
	itemUpdate.item = params.item;
	itemUpdate.product = params.product;
	itemUpdate.seller = params.seller;

	itemUpdate.save((err,itemUpdateStored) => {
		if(err){
			res.status(500).send({message: 'Error on the server: the item update has not been saved.'});
		}else{
			if(!itemUpdateStored){
				res.status(404).send({message: 'The item update has not been saved.'});
			}else{
				res.status(200).send({ItemUpdate: itemUpdateStored});
			}
		}
	});
}

function getItemUpdate(req,res){
	var itemUpdateId = req.params.id;
	
	ItemUpdate.findById(itemUpdateId, (err,itemUpdate) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!itemUpdate){
				res.status(404).send({message: 'Item Update not found'});
			}else{
				res.status(200).send({itemUpdate});
			}
		}
	});
}

function getItemUpdates(req,res){
	var page = 1;
	var itemsPerPage = 3;
	if(req.params.page){
		page = req.params.page;
	}
	
	ItemUpdate.find().sort('name').paginate(page, itemsPerPage, function(err,itemUpdates,total){
		if(err){
			res.status(500).send({message: 'Request error.'});
		}else{
			if(!itemUpdates){
				res.status(404).send({message: 'There are no item updates.'});
			}else{
				return res.status(200).send({
					totalItemUpdates: total,
					itemUpdates: itemUpdates
				});
			}
		}
	});
}

function getItemUpdatesByItem(req,res){
	const item = req.params.item;
	const itemsPerPage = Number(req.params.itemsPerPage);
	const page = Number(req.params.page);
	
	if(item && page && itemsPerPage){
		ItemUpdate.find({item: item}).sort('name').paginate(page, itemsPerPage, function(err,itemUpdates,total){
			if(err){
				res.status(500).send({message: 'Request error.'});
			}else{
				if(!itemUpdates){
					res.status(404).send({message: 'There are no item updates for the selected item.'});
				}else{
					return res.status(200).send({
						totalItemUpdates: total,
						itemUpdates: itemUpdates
					});
				}
			}
		});
	}else{
		res.status(200).send({message: 'Please, enter item, itemsPerPage and page.'});
	}
}

function deleteItemUpdate(req,res){
	var itemUpdateId = req.params.id;
	
	ItemUpdate.findByIdAndDelete(itemUpdateId,(err,removedItemUpdate) => {
		if(err){
			res.status(500).send({message:"Server error: the item could not be removed."});
		}else{
			if(!removedItemUpdate){
				res.status(404).send({message:"The item update could not be removed."});
			}else{
				res.status(200).send({removedItemUpdate});
			}
		}
	});
}

function updateItemUpdate(req,res){
	var itemUpdateId = req.params.id;
	var update = req.body;
	
	ItemUpdate.findByIdAndUpdate(itemUpdateId, update, (err, updatedItemUpdate) => {
		if(err){
			res.status(500).send({message:"Server error: the item update could not be updated."});
		}else{
			if(!updatedItemUpdate){
				res.status(404).send({message:"The item update could not be updated."});
			}else{
				res.status(200).send({
					updatedItemUpdate:updatedItemUpdate,
					update:update
				});
			}
		}
	});
}

module.exports = {
	test,
	saveItemUpdate,
	getItemUpdate,
	getItemUpdates,
	getItemUpdatesByItem,
	deleteItemUpdate,
	updateItemUpdate
};
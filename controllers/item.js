var Item = require('../models/item');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveItem(req,res){
	var item = new Item();
	var params = req.body;
	
	item.title = params.title;
	item.url = params.url;
	item.mainPicture = 'null';
	item.category = params.category;
	item.allInfo = params.allInfo;
	item.product = params.product;
	item.seller = params.seller;
	item.source = params.source;
	item.externalID = params.externalID;

	item.save((err,itemStored) => {
		if(err){
			res.status(500).send({message: 'Error on the server: the item has not been saved.'});
		}else{
			if(!itemStored){
				res.status(404).send({message: 'The item has not been saved.'});
			}else{
				res.status(200).send({item: itemStored});
			}
		}
	});
}

function getItem(req,res){
	var itemId = req.params.id;
	
	Item.findById(itemId, (err,item) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!item){
				res.status(404).send({message: 'Item not found'});
			}else{
				res.status(200).send({item});
			}
		}
	});
}

function getItems(req,res){
	var page = 1;
	var itemsPerPage = 3;
	if(req.params.page){
		page = req.params.page;
	}
	
	Item.find().sort('name').paginate(page, itemsPerPage, function(err,items,total){
		if(err){
			res.status(500).send({message: 'Request error.'});
		}else{
			if(!items){
				res.status(404).send({message: 'There are no items.'});
			}else{
				return res.status(200).send({
					totalItems: total,
					items: items
				});
			}
		}
	});
}

function deleteItem(req,res){
	var itemId = req.params.id;
	
	Item.findByIdAndDelete(itemId,(err,removedItem) => {
		if(err){
			res.status(500).send({message:"Server error: the item could not be removed."});
		}else{
			if(!removedItem){
				res.status(404).send({message:"The item could not be removed."});
			}else{
				res.status(200).send({removedItem});
			}
		}
	});
}

function updateItem(req,res){
	var itemId = req.params.id;
	var update = req.body;
	
	Item.findByIdAndUpdate(itemId, update, (err, updatedItem) => {
		if(err){
			res.status(500).send({message:"Server error: the item could not be updated."});
		}else{
			if(!updatedItem){
				res.status(404).send({message:"The item could not be updated."});
			}else{
				res.status(200).send({
					updatedItem:updatedItem,
					update:update
				});
			}
		}
	});
}

module.exports = {
	test,
	saveItem,
	getItem,
	getItems,
	deleteItem,
	updateItem
};
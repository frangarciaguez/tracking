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
	item.info = params.info;
	item.mainPicture = params.mainPicture;
	item.category = params.category;
	item.allInfo = params.allInfo;
	item.source = params.source;
	item.externalID = params.externalID;

	//product: { type: Schema.ObjectId },
	//seller: { type: Schema.ObjectId },
}

function getItem(req,res){
	var itemId = req.params.id;
	
	Item.findById(itemId, (err,item) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!product){
				res.status(404).send({message: 'Item not found'});
			}else{
				res.status(200).send({item});
			}
		}
	});
}

module.exports = {
	test,
	saveItem,
	getItem
};
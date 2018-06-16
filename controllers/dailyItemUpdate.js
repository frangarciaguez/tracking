var DailyItemUpdate = require('../models/dailyItemUpdate');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveDailyItemUpdate(req,res){
	var dailyItemUpdate = new DailyItemUpdate();
	
	var params = req.body;
	
	dailyItemUpdate.timestamp = params.timestamp;
	dailyItemUpdate.quantity = params.quantity;
	dailyItemUpdate.quantitySold = params.quantitySold;
	dailyItemUpdate.price = params.price;
	dailyItemUpdate.allInfo = params.allInfo;
	dailyItemUpdate.price = params.price;
	dailyItemUpdate.allInfo = params.allInfo;
	dailyItemUpdate.source = params.source;
	dailyItemUpdate.externalID = params.externalID;

	//item: { type: Schema.ObjectId },
}

function getDailyItemUpdate(req,res){
	var dailyItemUpdateId = req.params.id;
	
	Seller.findById(dailyItemUpdateId, (err,dailyItemUpdate) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!product){
				res.status(404).send({message: 'Daily Item Update not found'});
			}else{
				res.status(200).send({dailyItemUpdate});
			}
		}
	});
}

module.exports = {
	test,
	saveDailyItemUpdate,
	getDailyItemUpdate
};
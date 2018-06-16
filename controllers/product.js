var Product = require('../models/product');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveProduct(req,res){
	var product = new Product();
	var params = req.body;
	
	product.name = params.name;
	product.description = params.description;
	product.brand = params.brand;
	product.source = params.source;
	product.externalID = params.externalID;
}

function getProduct(req,res){
	var productId = req.params.id;
	
	Product.findById(productId, (err,product) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!product){
				res.status(404).send({message: 'Product not found'});
			}else{
				res.status(200).send({product});
			}
		}
	});
}

module.exports = {
	test,
	saveProduct,
	getProduct
};
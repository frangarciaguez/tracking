var Product = require('../models/product');
var mongoosePaginate = require('mongoose-pagination');

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
	product.image = 'null';
	
	product.save((err,productStored) => {
		if(err){
			res.status(500).send({message: 'Error on the server: the product has not been saved.'});
		}else{
			if(!productStored){
				res.status(404).send({message: 'The product has not been saved.'});
			}else{
				res.status(200).send({product: productStored});
			}
		}
	});
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

function getProducts(req,res){
	if(req.params.page){
	   var page = req.params.page;
	}else{
	   var page = 1;
	}
	var itemsPerPage = 3;
	
	Product.find().sort('name').paginate(page, itemsPerPage, function(err,products,total){
		if(err){
			res.status(500).send({message: 'Request error.'});
		}else{
			if(!products){
				res.status(404).send({message: 'There are no products.'});
			}else{
				return res.status(200).send({
					totalItems: total,
					products: products
				});
			}
		}
	});
}

function deleteProduct(req,res){
	var productId = req.params.id;
	
	Product.findByIdAndDelete(productId,(err,removedProduct) => {
		if(err){
			res.status(500).send({message:"Server error: the product could not be removed."});
		}else{
			if(!removedProduct){
				res.status(404).send({message:"The product could not be removed."});
			}else{
				res.status(200).send({removedProduct});
			}
		}
	});
}

function updateProduct(req,res){
	var productId = req.params.id;
	var update = req.body;
	
	Product.findByIdAndUpdate(productId, update, (err, updatedProduct) => {
		if(err){
			res.status(500).send({message:"Server error: the product could not be updated."});
		}else{
			if(!updatedProduct){
				res.status(404).send({message:"The product could not be updated."});
			}else{
				res.status(200).send({updatedProduct:updatedProduct,update:update});
			}
		}
	});
}

module.exports = {
	test,
	saveProduct,
	getProduct,
	getProducts,
	deleteProduct,
	updateProduct
};
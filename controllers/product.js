var fs = require('fs');
var path = require('path');
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
	var page = 1;
	var itemsPerPage = 3;
	if(req.params.page){
		page = req.params.page;
	}
	
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

function uploadImage(req,res){
	var productId = req.params.id;
	var file_name = 'Image not uploaded';
	
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\/');
		file_name = file_split[2];
		
		var extension_split = file_name.split('\.');
		var file_extension = extension_split[1];
		
		if(file_extension=='png' || file_extension=='jpg' || file_extension=='gif'){
			Product.findByIdAndUpdate(productId, {image: file_name}, (err,productUpdated) => {
				if(err){
					res.status(500).send({message:'Server Error. Not possible to upload the image.'});
				}else{
					if(!productUpdated){
						res.status(200).send({message:'Error uploading the image. Please try again.'});
					}
					else{
						res.status(200).send({image: file_name, product: productUpdated});
					}
				}
			});
		}else{
			res.status(200).send({message:'Not valid file extension.'});
		}
		console.log(file_extension);
	}else{
		res.status(200).send({message: 'You haven´t uploaded any image.'});
	}
}

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var pathFile = './uploads/products/'+imageFile;
	
	fs.exists(pathFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message: 'The image doesn´t exist.'});
		}
	});
}

module.exports = {
	test,
	saveProduct,
	getProduct,
	getProducts,
	deleteProduct,
	updateProduct,
	uploadImage,
	getImageFile
};
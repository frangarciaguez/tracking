var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

function saveUser(req,res){
	var user = new User();
	var params = req.body;
	
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.password = params.password;
	user.role = 'ROLE_ADMIN';
	user.image = params.image;
	
	if(params.password){
		bcrypt.hash(params.password, null, null, function(err,hash){
			user.password = hash;
			
			if(user.name !== null && user.surname !== null && user.email !== null && user.role !== null){
				user.save((err,userStored) => {
					if(err){
						res.status(500).send({message: 'Internal Server Error.'});
					}else{
						if(!userStored){
							res.status(404).send({message: 'The user couldn´t be saved.'});
						}else{
							res.status(200).send({userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Fill all the fields: name, surname, email and role.'});
			}
		});
	}else{
		res.status(200).send({message:'Enter the password'});
	}
}

function loginUser(req,res){
	var params = req.body;
	
	var email = params.email;
	var password = params.password;
	
	User.findOne({email: email},(err,user) => {
		if(err){
			res.status(500).send({message:'Error in the request.'});
		}else{
			if(!user){
				res.status(404).send({message:'User email not found.'});
			}else{
				//Check the password
				bcrypt.compare(password, user.password, function(err,check){
					if(check){
						//Return the data of the user
						if(params.gethash){
							//Return a token of JWT
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message:'It wasn´t possible to log in. Please try again.'});
					}
				});
			}
		}
	});
}

function getUser(req,res){
	var userId = req.params.id;
	
	User.findById(userId, (err,user) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!user){
				res.status(404).send({message: 'User not found'});
			}else{
				res.status(200).send({user});
			}
		}
	});
}

function updateUser(req,res){
	var userId = req.params.id;
	var update = req.body;
	
	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message:'Internal Server Error.'});
		}else{
			if(!userUpdated){
				res.status(404).send({message:'Error updating the user. The user has not been updated.'});
			}else{
				res.status(299).send({oldUserData: userUpdated, newUserData: update});
			}
		}
	});
}

function uploadImage(req,res){
	var userId = req.params.id;
	var file_name = 'Image not uploaded';
	
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\/');
		file_name = file_split[2];
		
		var extension_split = file_name.split('\.');
		var file_extension = extension_split[1];
		
		if(file_extension=='png' || file_extension=='jpg' || file_extension=='gif'){
			User.findByIdAndUpdate(userId, {image: file_name}, (err,userUpdated) => {
				if(err){
					res.status(500).send({message:'Server Error. Not possible to upload the image.'});
				}else{
					if(!userUpdated){
						res.status(200).send({message:'Error uploading the image. Please try again.'});
					}
					else{
						res.status(200).send({user: userUpdated});
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
	var pathFile = './uploads/users/'+imageFile;
	
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
	saveUser,
	getUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};
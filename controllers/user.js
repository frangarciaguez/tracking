var User = require('../models/user');

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
	user.role = params.role;
	user.image = params.image;
}

function getUser(req,res){
	var userId = req.params.id;
	
	Seller.findById(userId, (err,user) => {
		if (err){
			res.status(500).send({message: 'Error in the request'});
		}else{
			if(!product){
				res.status(404).send({message: 'User not found'});
			}else{
				res.status(200).send({user});
			}
		}
	});
}

module.exports = {
	test,
	saveUser,
	getUser
};
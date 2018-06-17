var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "secret-key-app";

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message:'The request doesn´t have the header of authentication.'});
	}
	
	var token = req.headers.authorization.replace(/['"]+/g, '');
	
	try{
		var payload = jwt.decode(token, secret);
		
		if(payload.ex >= moment().unix()){
			return res.status(401).send({message:'The authorization token has expired.'});
		}
	}catch(ex){
		console.log(ex);
		return res.status(404).send({message:'Authorization token not valid.'});
	}
	
	req.user = payload;
	
	next();
};
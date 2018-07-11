var mongoose = require ('mongoose');
var app = require('./app');
//var port = process.env.PORT || 3977;
var port = process.env.PORT || 8080;
//var ip = process.env.IP || '172.31.0.184';
var ip = '172.31.0.184';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/trackingdb', (err, res) => {
	if (err){
		throw (err);
	}else{
		console.log('The connection to the database is correct...');
		app.listen(port, ip, function(){
			console.log("Server of the api rest listening on http://"+ip+":"+port);
		});
	}
});
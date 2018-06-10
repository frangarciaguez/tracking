var mongoose = require ('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/trackingdb', (err, res) => {
	if (err){
		throw (err);
	}else{
		console.log('The connection to the database is correct...');
		app.listen(port, function(){
			console.log("Server of the api rest listening on http://localhost:"+port);
		});
	}
});
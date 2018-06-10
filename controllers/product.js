function test(req,res){
	res.status('200').send({
		message: 'helloWorld!'
	});
}

module.exports = {
	test	
};
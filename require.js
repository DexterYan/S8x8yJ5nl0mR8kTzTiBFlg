var request  =  require ('request');
var options =  {
	url: 'http://challenge.aftership.net:9578/v1/beanstalkd',
	method: 'POST',
	headers: {
		'aftership-api-key': 'a6403a2b-af21-47c5-aab5-a2420d20bbec'
	}
}

request.post(options, function(err,res,body){
	if(err){
		console.log(err);
	}else{
		//console.log(res);
		console.log(body);
	}
});
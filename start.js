var Config = require('./config');
var fivebeans = require('fivebeans');

var client = new fivebeans.client(Config.address, Config.port);
var tube = "DexterYan";
var priority = 0;
var delay = 0;
var ttr = 60;
var payload = JSON.stringify({'from' : 'CNY', 'to' : 'HKD'});


client
	.on('connect', function(){
		client.use(tube, function(err, tube_name) {
			console.log("tube_name " + tube_name);
			client.put(priority, delay, ttr, payload, function(err, job_id) {
				client.end();
				console.log("job_id " + job_id);
			});
		});
	})
	.on('error', function(err){
		console.log(err);

	})
	.on('close', function(){

	})
	.connect();




var fivebeans = require('fivebeans');

var client = new fivebeans.client('localhost', 11300);
var tube = "DexterYan";
var priority = 0;
var delay = 0;
var ttr = 60;
var payload = JSON.stringify({'from' : 'CNY', 'to' : 'HKD'});


client
	.on('connect', function(){
		client.use(tube, function(err, tubename) {
			console.log("tubename " + tubename);
			client.put(priority, delay, ttr, payload, function(err, jobid) {
				client.end();
				console.log("jobid " + jobid);
			});
		});
	})
	.on('error', function(err){
		console.log(err);

	})
	.on('close', function(){

	})
	.connect();




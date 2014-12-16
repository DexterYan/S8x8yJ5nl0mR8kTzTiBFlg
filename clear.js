var config = require('./config');
var fivebeans = require('fivebeans');
var client = new fivebeans.client(config.address, config.port);
var tube = "DexterYan";

function reserveJob(){
	client.reserve(function(err, jobid, payload){
		if(err){
			console.log(err);
			client.end;
		}else{
			console.log("reserve " + jobid);
			destroyTube(jobid);
		}
	})
}

function destroyTube(jobid){
	client.destroy(jobid, function(err) {
		console.log("destroy " + jobid);
		if(err){
			console.log(err)
			client.end();
		}else{
			client.end();
		}
	});
}
client
	.on('connect', function(){
		client.use(tube, function(err, tubename){
			console.log("tubename " + tubename);
			client.watch(tubename, function(err, numwatched){
				reserveJob();
			})
		})
	})
	.on('error', function(err){
		console.log(err);
	})
	.on('close', function(){

	})
	.connect();
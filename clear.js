var Config = require('./config');
var fivebeans = require('fivebeans');
var client = new fivebeans.client(Config.address, Config.port);
var tube = "DexterYan";

function reserveJob(){
	client.reserve(function(err, job_id, payload){
		if(err){
			console.log(err);
			client.end;
		}else{
			console.log("reserve " + job_id);
			destroyTube(job_id);
		}
	})
}

function destroyTube(job_id){
	client.destroy(job_id, function(err) {
		console.log("destroy " + job_id);
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
		client.use(tube, function(err, tube_name){
			console.log("tube_name " + tube_name);
			client.watch(tube_name, function(err, num_watched){
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
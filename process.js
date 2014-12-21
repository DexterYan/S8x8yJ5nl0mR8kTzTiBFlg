var Config = require('./config');
var fivebeans = require('fivebeans');
var Crawler = require('./crawler');

var client = new fivebeans.client(Config.address, Config.port);
var tube = "DexterYan";
var priority = 0;
var ttr = 60;
var from = "CNY";
var to = "HKD"
var payload = JSON.stringify({'from' : from, 'to' : to});

var crawler = new Crawler(from,to);
var count = 0;

function processData(job_id) {
	crawler.getRate(function(res){
		crawler.saveDb(from,to,res,function(res){
			if(res){
				count++;
				destroyTube(job_id);
			}else{
				putTube(3);			
			}	
		})
	})
}

function destroyTube(job_id){
	client.destroy(job_id, function(err) {
		console.log("destroy " + job_id);
		if(err){
			console.log(err)
			client.end();
		}else if(count > 9){
			console.log("Mission End");
			client.end();
		}else{
			putTube(60);
		}
	});
}

function putTube(delay) {
	client.put(priority, delay, ttr, payload, function(err, job_id) {			
		console.log("job_id " + job_id);
		reserveJob();
	});
}

function reserveJob(){
	client.reserve(function(err, job_id, payload){
		if(err){
			console.log(err);
			client.end;
		}else{
			console.log("reserve " + job_id);
			processData(job_id);
		}
	})
}

client
	.on('connect', function(){
		client.use(tube, function(err, tube_name) {
			console.log("tube_name " + tube_name);
			 client.watch(tube_name, function(err,numwatched){
			 	reserveJob();
			 })
		});
	})
	.on('error', function(err){
		console.log(err);
	})
	.on('close', function(){

	})
	.connect();



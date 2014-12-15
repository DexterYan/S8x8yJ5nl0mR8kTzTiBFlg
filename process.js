var fivebeans = require('fivebeans');
var Crawler = require('./crawler');

var client = new fivebeans.client('localhost', 11300);
var tube = "DexterYan";
var priority = 0;
var ttr = 60;
var from = "CNY";
var to = "HKD"
var payload = JSON.stringify({'from' : from, 'to' : to});

var crawler = new Crawler(from,to);
var count = 0;

function processData(jobid) {
	crawler.getRate(function(res){
		crawler.saveDb(from,to,res,function(res){
			if(res){
				count++;
				destroyTube(jobid);
			}else{
				putTube(3);			
			}	
		})
	})
}

function destroyTube(jobid){
	client.destroy(jobid, function(err) {
		console.log("destroy " + jobid);
		if(err){
			console.log(err)
			client.end();
		}else if(count > 9){
			console.log("Mission End");
			client.end();
		}else{
			putTube(10);
		}
	});
}

function putTube(delay) {
	client.put(priority, delay, ttr, payload, function(err, jobid) {			
		console.log("jobid " + jobid);
		reserveJob();
	});
}

function reserveJob(){
	client.reserve(function(err, jobid, payload){
		if(err){
			console.log(err);
			client.end;
		}else{
			console.log("reserve " + jobid);
			processData(jobid);
		}
	})
}

client
	.on('connect', function(){
		client.use(tube, function(err, tubename) {
			console.log("tubename " + tubename);
			 client.watch(tubename, function(err,numwatched){
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



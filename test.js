var Crawler = require('./crawler');
var from = "CNY";
var to = "HKD"
var crawler = new Crawler(from,to);

crawler.getRate(function(res){
	crawler.saveDb(from,to,res,function(res){
		console.log(res);
		
	})
	
})

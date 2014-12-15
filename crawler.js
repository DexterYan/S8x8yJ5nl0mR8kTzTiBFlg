
function Crawler (from,to) {
	this.cheerio = require('cheerio');
	this.request = require('request');
	this.mongoose = require('mongoose');
	this.DataModel = require('./model');
	this.url = "http://www.xe.com/currencyconverter/convert/?Amount=1&From=" + from + "&To=" + to + "#converter";
}

Crawler.prototype.getRate = function(callback) {
	var self = this;
	self.request(self.url, function(err, res,body){
		if(err){
			console.log(err);
		}else{
			$ = self.cheerio.load(body);
			callback(Number($('.uccRes .rightCol').text().match(/(\d[\d\.\*]*)/g)[0]).toFixed(2));
		}
	});
};

Crawler.prototype.saveDb = function(from, to, rate,callback) {
	var self = this;
	self.mongoose.connect('mongodb://aftership:1234@ds063170.mongolab.com:63170/aftership');
	var dataModel = new self.DataModel({
		from: from,
		to: to,
		created_at: new Date(),
		rate: rate
	})
	dataModel.save(function(err,res){
		if(err){
			console.log(err);
			self.mongoose.disconnect()
			callback(false);
		}else{
			console.log(res);
			self.mongoose.disconnect()
			callback(true);
		}
	})
};

module.exports = Crawler;


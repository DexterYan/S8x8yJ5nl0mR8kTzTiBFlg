var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataModel = new Schema ({
	from: String,
	to: String,
	created_at: Date,
	rate: String
});

var DataModel = mongoose.model('dataModel',dataModel);

module.exports = DataModel;

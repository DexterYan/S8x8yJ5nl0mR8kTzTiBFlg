var config = {};

switch(process.env.NODE_ENV){
	case 'dev':
	console.log("dev");
	config.address = "localhost";
	config.port = "11300";
	break;

	case 'product':
	console.log("product");
	config.address = "challenge.aftership.net";
	config.port = "11300"
	break;
}

module.exports = config;
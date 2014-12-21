var Config = {};

switch(process.env.NODE_ENV){
	case 'dev':
	console.log("dev");
	Config.address = "localhost";
	Config.port = "11300";
	break;

	case 'product':
	console.log("product");
	Config.address = "challenge.aftership.net";
	Config.port = "11300"
	break;
}

module.exports = Config;
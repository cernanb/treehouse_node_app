var router = require("./router.js");
//Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
//Solution: Use node.js to perfrom the profile lookups and serve our templates via HTTP

//Plan
//1: Create a web server
var http = require('http');

http.createServer( function (request, response) {
    router.home(request, response);
    router.user(request, response);
}).listen(3000);
console.log('Server running at port:3000');



//4: Function that handles the reading of files and merge in values
	//read from file and get a string
		//merge values into string
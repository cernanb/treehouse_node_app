var router = require("./router.js");
var http = require('http');

var port = Number(process.env.PORT || 3000); //specify port whether local or on Heroku

http.createServer( function (request, response) { //create web server
    
    router.home(request, response);
    router.user(request, response);

}).listen(port);
console.log('Server running at port: ' + port);




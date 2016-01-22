var Profile = require("./profile.js");
var renderer = require('./renderer.js');
var querystring = require("querystring");

var commonHeaders = { 'Content-Type': 'text/html' }; //caching the text/html content header

function home(request, response) { //This handles the GET / & POST / HTTP routes
	
	if (request.url === '/') { //check for home request
		
    if (request.method.toLowerCase() === "get") { //check to see if HTTP method is GET
  		
      response.writeHead(200, commonHeaders);
      //render certain html files
    	renderer.view("header", {}, response);
    	renderer.view("search", {}, response);
    	renderer.view("footer", {}, response);
      response.end();
    
    } else { //HTTP method is POST

      request.on("data", function(postBody) {
        
        var query = querystring.parse(postBody.toString()); //pull out the username
        response.writeHead(303, {"Location": "/" + query.username }); //redirect to /username
        response.end();
        
      });

    }
  
  }
	
}

function user(request, response) {
	
	var username = request.url.replace("/", ""); //remove "/" from the request url so what is left is just the username
	if (username.length > 0) { //check to see if username is actually entered
		response.writeHead(200, commonHeaders);
  	renderer.view("header", {}, response);

  	var studentProfile = new Profile(username); //create profile with username passed in

  	studentProfile.on("end", function(profileJSON){

      //pull out certain values from JSON object using the corresponding keys and create a JS object
  		var values = {
  			avatarUrl: profileJSON.gravatar_url, 
  			username: profileJSON.profile_name,
  			badges: profileJSON.badges.length,
  			javascriptPoints: profileJSON.points.JavaScript
  		}

  		renderer.view("profile", values, response);
  		renderer.view("footer", {}, response);
      response.end();

  	});

  	studentProfile.on("error", function(error) {

  		renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
  		renderer.view("footer", {}, response);
      response.end();

  	});
	}
}

module.exports.home = home;
module.exports.user = user;
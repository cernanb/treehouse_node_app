function home(request, response) {
	//if url == "/" && GET
	if (request.url === '/'){
		//show search field
		response.writeHead(200, { 'Content-Type': 'text/plain' });
  	response.write("Header\n");
  	response.write("Search\n");
  	response.end("Footer\n");
  }
	//if url == "/" && POST
		//redirect to /:username
}
	


function user(request, response) {
	//if url =="/...." 
	var username = request.url.replace("/", "");
	if(username.length > 0) {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
  	response.write("Header\n");
  	response.write(username + "\n");
  	response.end("Footer\n");
		//get json from treehouse 
			//on "end"
				//show profile
			//on "error"
				//show error 	
	}
}



module.exports.home = home;
module.exports.user = user;
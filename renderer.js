var fs = require('fs');

function mergeValues(values, content) {

	for(var key in values) {

		content = content.replace("{{" + key + "}}", values[key]); //insert the profile values from the JSON object created in router.js

	}

	return content;

}

function view(templateName, values, response) {

	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"}); //read from the file passed in
  
	fileContents = mergeValues(values, fileContents); 

 	response.write(fileContents);

}

module.exports.view = view;

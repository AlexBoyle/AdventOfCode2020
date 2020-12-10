const fs = require('fs');
const path = require('path');
require('./utilitys')
let inputFileLocation;
let data;

// Parse input args
let solutionFilepath = path.parse(process.argv[2]);
for(var i = 3; process.argv[i] != null; i ++) {
	switch(process.argv[i]) {
		case '-i':
			i++;
			inputFileLocation = process.argv[i];
			break;
	}
}
// Load input data
if (inputFileLocation != null) {
	try {
		data = fs.readFileSync(inputFileLocation, 'utf8');
		data = data.split('\r\n');
	} catch (err) {
		console.error(err);
		exit(1);
	}
}
// Run solution file
const solutionFunction = require(solutionFilepath.dir + '/' + solutionFilepath.name);
utility.timeFunction(solutionFunction, [data])
//solutionFunction(data);

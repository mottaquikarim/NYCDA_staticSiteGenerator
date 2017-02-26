#!/usr/bin/env node

const generateSite = require('./static-site');
const program = require('commander');

program
  .version('0.0.1')
  .option('-s, --source [fileSource]', 'Where to read content from?', null)
  .option('-t, --template [templateSource]', 'Where is template HTML located?', null)
  .option('-d, --destination [destinationSource]', 'Where to write content to?', null)
  .parse(process.argv);
 
console.log('Here are your static site generator options...');

let shouldThrowErr = false;
if (!program.source) {
	console.log('ERROR: Source is required!');
	shouldThrowErr = true;
}
else if (!program.template) {
	console.log('ERROR: template is required!');
	shouldThrowErr = true;
}
else if (!program.destination) {
	console.log('ERROR: destination is required!');
	shouldThrowErr = true;
}

if (shouldThrowErr) {
	throw new Error();
}


// if you are here, all args are passed in, run function
console.log('Starting your build...')
generateSite(program.source, program.template, program.destination)
	.then(() => {
		console.log('Completed build!');
	})
	.catch((e) => {
		console.log(e)
	})

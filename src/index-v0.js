const fsPromise = require('./fs-promise');
// const exec = require('child_process').exec;

const readContent = fsPromise.fileRead('../content/index.md');

const readHtml = fsPromise.fileRead('../index.template.html');

Promise.all([readContent, readHtml])
	.then((contents) => {
		console.log('SO FAR SO GOOD');
		
		const indexContent = contents[0];
		const indexHtml = contents[1];

		const transformedHtml = indexHtml.replace('CONTENT_HERE', indexContent)
		
		console.log(indexContent, indexHtml, transformedHtml);

		return fsPromise.fileWrite('../index.html', transformedHtml)
	})
	.then((isWritten) => {
		if(isWritten) {
			console.log('done!');
			// exec('open ../index.html');
		}
	})
	.catch((e) => {
		console.log("LOL something went wrong");
		console.log(e);
	});
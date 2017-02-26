const fsPromise = require('./fs-promise');

const generateSite = (source, template, destination) => {
	const readFileList = fsPromise.fileList(source);
	const readContents = readFileList.then((fileNames) => {

		const fileReadRequests = [];
		for( const fileName of fileNames ) {
			const readFile = fsPromise.fileRead(source+'/'+fileName);
			fileReadRequests.push(readFile);
		}

		return Promise.all(fileReadRequests);
	});
	const readHtml = fsPromise.fileRead(template);

	return Promise.all([readContents, readHtml, readFileList])
		.then((contents) => {
			const indexContents = contents[0];
			const templateHtml = contents[1];
			const fileList = contents[2];

			const sidebarHtml = [];
			for(const fileName of fileList) {
				const fileNameOnly = fileName.replace('.md', '');

				const htmlExtension = fileNameOnly + '.html';
				const userReadableName = fileNameOnly.split('-').join(' ');
				// const userReadableName = fileNameOnly.split('-').map((currWord) => {
				// 	return currWord.slice(0,1).toUpperCase() + currWord.slice(1).toLowerCase();
				// }).join(' ');

				sidebarHtml.push(`<li>
					<a href="${htmlExtension}">${userReadableName === 'index' ? 'Home': userReadableName}</a>
				</li>`);
			}

			const sidebar = sidebarHtml.join('\n');

			const fileWritePromises = [];
			for(let i = 0; i < fileList.length; ++i) {
				const currentContent = indexContents[i];
				const currentFileName = destination + '/' + fileList[i].replace('.md', '.html');

				let transformedHtml = templateHtml.replace('CONTENT_HERE', currentContent);
				transformedHtml = transformedHtml.replace('SIDEBAR_HERE', sidebar)
				fileWritePromises.push(fsPromise.fileWrite(currentFileName, transformedHtml));
			}
		

			return Promise.all(fileWritePromises)
		});
}

module.exports = generateSite;








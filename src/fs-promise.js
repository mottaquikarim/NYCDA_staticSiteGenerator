const fs = require('fs');

const read = (filePath, encoding='utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, fileContents) => {
            if (err) { reject(err); }
            else { resolve(fileContents); }
        });
    });
};

const write = (filePath, data, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, encoding, (err) => {
            if (err) { reject(err); }
            else { resolve(true); }
        });
    });
};

const readDir = (folderName) => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderName, (err, fileList) => {
            if (err) { reject(err); }
            else { resolve(fileList); }
        });
    });
};


module.exports = {
    fileRead: read,
    fileWrite: write,
    fileList: readDir,
};











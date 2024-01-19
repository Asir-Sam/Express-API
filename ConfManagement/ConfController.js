const fs = require('node:fs');
const pathModule = require('path');

const confController = {

    readFileSync (dirName , pathName) {
        console.log(dirName, pathName);
        let filePath = confController.joinPath(dirName, pathName);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            console.log(data);
            return data;
          } catch (err) {
            console.error(err);
          }

    }
,
    joinPath (dirName , path) {
        return pathModule.join(dirName, path);
    }


};

module.exports = confController;
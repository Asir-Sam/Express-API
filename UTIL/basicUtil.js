const basicUtils = {

    isEmptyObject (objectName) {

        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
          );

    }
,
    getQueryString (tableName, quertLimit) {

        let queryString;
        if(tableName !== undefined && quertLimit !== undefined && isFinite(quertLimit)) 
            queryString = `SELECT * FROM ${tableName} LIMIT ${quertLimit}`;

        else if(tableName !== undefined)
            queryString = `SELECT * FROM ${tableName}`;

        else  return null;

        return queryString;

    }
};

module.exports = basicUtils;
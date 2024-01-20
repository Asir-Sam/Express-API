const basicUtils = {

    isEmptyObject (objectName) {

        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
          );

    }
,
    getQueryString (tableName, quertLimit, searchString, sortOrder) {

        let queryString;
        if(searchString !== undefined && sortOrder !== undefined && quertLimit !== undefined && isFinite(quertLimit))
            queryString = `SELECT * FROM ${tableName} ORDER BY ${searchString} ${sortOrder} LIMIT ${quertLimit}`;

        else if(searchString !== undefined && quertLimit !== undefined && isFinite(quertLimit))
            queryString = `SELECT * FROM ${tableName} ORDER BY ${searchString}  LIMIT ${quertLimit}`;

        else if(tableName !== undefined && quertLimit !== undefined && isFinite(quertLimit)) 
            queryString = `SELECT * FROM ${tableName} LIMIT ${quertLimit}`;

        else if(tableName !== undefined)
            queryString = `SELECT * FROM ${tableName}`;

        else  return null;

        return queryString;

    }
};

module.exports = basicUtils;
const basicUtils = {

    isEmptyObject (objectName) {

        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
          );

    }
,

     isValidString(str) {

            return typeof str === 'string';
        
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
        console.log(queryString);
        return queryString;

    }
,
    getTableName (queryString, tableName) {

        if(basicUtils.isValidString(tableName))
            queryString = `SELECT * FROM ${tableName}`;
        else
            return "";

    return queryString;    

    }
 ,
    getLimit (queryString, limit) { 

        if(isFinite(limit))
             queryString = `LIMIT ${limit}`;
        else 
            return "";

    return queryString        

    }  
,
    getOrderBy (queryString, orderBy, sortOrder) { 

        if(basicUtils.isValidString(orderBy))
            queryString = `ORDER BY ${orderBy}`;
        else 
            return "";
        if(basicUtils.isValidString(sortOrder))
            queryString = `ORDER BY ${orderBy} ${sortOrder}`;
        
    return queryString;  

    }   
};

module.exports = basicUtils;
const basicUtils = require('../UTIL/basicUtil');

function selectQuery (connection, tableName, quertLimit ,res) {
    let queryString = basicUtils.getQueryString(tableName, quertLimit);
    if(queryString !== null && queryString !== undefined) {
        var DBresult = connection.query(queryString, function (err, result, fields) {
            if (err) throw err;
       
            res.status(200).json(result);
            
           });
    }
    else
    res.status(404).send("Please Check Your Params");
}

module.exports = selectQuery;
const basicUtils = require('../UTIL/basicUtil');

function selectQuery (connection, tableName, quertLimit, searchString, sortOrder,res) {
    let queryFormation = '';;
    queryFormation =` ${basicUtils.getTableName(queryFormation,tableName)} ${basicUtils.getOrderBy(queryFormation,searchString, sortOrder)} ${basicUtils.getLimit(queryFormation,quertLimit)}`;
    let queryString = basicUtils.getQueryString(tableName, quertLimit, searchString, sortOrder);
    if(queryString !== null && queryString !== undefined) {
        var DBresult = connection.query(queryFormation, function (err, result, fields) {
            if (err) res.status(404).send(err);
       
            res.status(200).json(result);
            
           });
    }
    else
    res.status(404).send("Please Check Your Params");
}

module.exports = selectQuery;
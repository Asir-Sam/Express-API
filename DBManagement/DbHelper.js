const basicUtils = require('../UTIL/basicUtil');

function selectQuery (connection, tableName, quertLimit, searchString, sortOrder, columnName, likeBy, res) {
    let queryFormation = '';;
    queryFormation =` ${basicUtils.getTableName(queryFormation,tableName)} ${basicUtils.getLikeBy(queryFormation, columnName, likeBy)} ${basicUtils.getOrderBy(queryFormation,searchString, sortOrder)} ${basicUtils.getLimit(queryFormation,quertLimit)}`;
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

// function createTable(connection,tableName, columns) {

//     let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
//     columns.forEach(column => {
//       query += `${column.name} ${column.type}`;
  
//       if (column.primaryKey) {
//         query += ' PRIMARY KEY';
//       }
  
//       query += ', ';
//     });
  
//     query = query.slice(0, -2) + ')';
//     connection.query(query, (err, results) => {
//       if (err) {
//         console.error('Error creating table:', err);
//       } else {
//         console.log('Table created successfully');
//       }
//     });

//   }



module.exports = selectQuery;
//module.exports = createTable;
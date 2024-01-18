function selectQuery (connection, tableName, res) {
    if(tableName !== undefined){
        var DBresult = connection.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
            if (err) throw err;
       
            res.status(200).json(result);
            
           });
    }
    else
    res.status(404).send("Please Check Your Params");
}

module.exports = selectQuery;
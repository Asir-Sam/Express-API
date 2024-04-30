const basicUtils = require('../UTIL/basicUtil');

function UserAuth (connection, tableName, columnName, email, password, res) {
         
        let queryString = '';
         queryString = `${basicUtils.getTableName(queryString, tableName)} ${basicUtils.getWhereBy(queryString, columnName, email)}`
        console.log('queryString',queryString);
        if(queryString !== null && queryString !== undefined) {
            var DBresult = connection.query(queryString, function (err, result, fields) {
                if (err) res.status(404).send(err);
                console.log('result',result)
                if(result.length > 0)
                res.status(200).json("LoginSuccessful");
                
               });
        }
        else
        res.status(404).send("Please Check Your Params");
    



}

module.exports = UserAuth;
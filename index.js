const express = require('express');
const apiRouter = express.Router();
const createConnection = require('./DBManagement/DbController');
const selectQuery = require('./DBManagement/DbHelper');
const basicUtils = require('./UTIL/basicUtil');
const confController = require('./ConfManagement/ConfController');
const app = express();
const port = 3000;
const path = require('path');
var connection;
app.use(express.static('./public'));
const customDBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Rishon@123',
    database: 'samrdm',
  };

 const tableMapping = {

    getInventoryTable: function ( inventoryType, res ) {
      let tableName;
      try {
        switch (inventoryType) {
          case "server":
            tableName = "EMS_SERVER_INFO";
            break;
          case "application":
            tableName = "EMS_APPINFO";
            break;  
          case "device":
            tableName = "EMS_DEVICE_INFO";
            break;
          case 'ups':
             tableName = "EMS_UPS_INFO";
          default:
            break;
        } 
        return tableName;

      } catch (error) {
        console.error(error);
      }
    }
,
    getLimit (queryParam) {

      if(!basicUtils.isEmptyObject(queryParam))
        return Object.keys(queryParam).includes('limit') ? queryParam['limit'] : undefined;
    
    }

 } 


app.get('/ems/api/inventory/:inventoryType', (req, res, next) => {

    let tableName = tableMapping.getInventoryTable(req.params.inventoryType, res);
    let quertLimit = tableMapping.getLimit(req.query);
    console.log(quertLimit);
    let dbData = selectQuery(connection, tableName, quertLimit, res);
    
  });
  
app.get('*', (req, res, next) => {

    res.status(404).sendFile(path.resolve(__dirname, './public/notfound.html'));

});

app.listen(port, (err, res) => {

    console.log(`Example app listening on port ${port}`)
   const dbConfObject = confController.readFileSync(__dirname, "/public/DBconf/dbconf.csv");
    console.log(dbConfObject);
    connection = createConnection(dbConfObject);

});
const express = require('express');
const apiRouter = express.Router();
const createConnection = require('./DBManagement/DbController');
const selectQuery = require('./DBManagement/DbHelper');
const createTable = require('./DBManagement/DbHelper');
const basicUtils = require('./UTIL/basicUtil');
const confController = require('./ConfManagement/ConfController');
const UserAuth = require('./User-Management |Login - Control/userauth');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors());
var connection;
app.use(express.static('./public'));
const customDBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Rishon@123',
    database: 'samrdm',
    port: 3306,
  };
  var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

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
          case 'pmdata':
              tableName = "EMS_PM_MYSQL_DB_TABLE_STATISTICS"
         //  tableName = "EMS_PM_TOMCAT_SERVLET";
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
    ,
    getSearch (queryParam) {

      if(!basicUtils.isEmptyObject(queryParam))
        return Object.keys(queryParam).includes('search') ? queryParam['search'] : undefined;

    }
    ,
    getSortOrder (queryParam) {

      if(!basicUtils.isEmptyObject(queryParam))
        return Object.keys(queryParam).includes('sort') ? queryParam['sort'] : undefined;

    }
    ,
    getLikeValue (queryParam) {

      if(!basicUtils.isEmptyObject(queryParam)){
          return Object.keys(queryParam).includes('like') ? queryParam['like'] : undefined;
      }

    }
    ,
    getWhereColumnName (queryParam) {

      if(!basicUtils.isEmptyObject(queryParam)){
          return Object.keys(queryParam).includes('col') ? queryParam['col'] : undefined;
      }
    }

 } 


app.get('/ems/api/inventory/:inventoryType', (req, res, next) => {

    let tableName = tableMapping.getInventoryTable(req.params.inventoryType, res);
    let quertLimit = tableMapping.getLimit(req.query); 
    let searchString = tableMapping.getSearch(req.query);
    let sortOrder = tableMapping.getSortOrder(req.query);
    let columnName = tableMapping.getWhereColumnName(req.query);
    let likeBy = tableMapping.getLikeValue(req.query);
    console.log(columnName,likeBy);

    let dbData = selectQuery(connection, tableName, quertLimit, searchString, sortOrder, columnName, likeBy, res);
    
  });

  app.post('/api/userauth', cors(corsOptions) ,(req, res) => {

      console.log(req.body.data);
      let email = req.body.data.email;
      let password = req.body.data.password;
    let userauthe =   UserAuth(connection, 'USER_AUTH', 'email', email, password,res);
   // console.log(userauthe);
      // const columns = [
      //   { name: 'id', type: 'INT AUTO_INCREMENT', primaryKey: true },
      //   { name: 'username', type: 'VARCHAR(255)'},
      //   { name: 'email', type: 'VARCHAR(255)'}
      // ];
     // createTable(createConnection(customDBConfig) , 'USER_AUTH', columns)

   });
  
app.get('*', (req, res, next) => {

    res.status(404).sendFile(path.resolve(__dirname, './public/notfound.html'));

});

app.listen(port, (err, res) => {

    console.log(`Example app listening on port ${port}`)
  // const dbConfObject = confController.readFileSync(__dirname, "/public/DBconf/dbconf.csv");
   // console.log(dbConfObject);
    connection = createConnection(customDBConfig);

});
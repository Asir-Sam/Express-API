const mysql = require('mysql2');

function createConnection(config) {
  const connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }

    console.log(`Connected to MySQL database ${config.database}`);
  });

  connection.on('error', (err) => {
    console.error('MySQL database connection error:', err);
  });

  return connection;
}

module.exports = createConnection;

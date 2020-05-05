const mysql = require("mysql");
dotenv = require('dotenv');
dotenv.config();
const appClient = global.gConfig;


// Create a connection to the database
const connection = mysql.createConnection({
  user: appClient.db_user,
  host:  appClient.db_host,
  database:  appClient.database,
  password:  appClient.db_password,
});

// open the sql connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
// Create required tables
connection.query(
  `CREATE TABLE IF NOT EXISTS posts (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    body varchar(255) NOT NULL
  );`, (err, res) => {
  if (err) {
    console.log("error creating posts table: ", err);
    return;
  }
});


module.exports = connection;
const {Client} = require('pg'),
dotenv = require('dotenv');
dotenv.config();

// Create a connection to the database
const client = new Client({
  user: process.env.PGUSER,
  host:  process.env.PGHOST,
  database:  process.env.PGDATABASE,
  password:  process.env.PGPASSWORD,
  port:  process.env.PGPORT
});

// open the psql connection
client.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = client;
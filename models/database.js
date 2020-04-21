const {Pool, Client} = require('pg'),
dotenv = require('dotenv');
dotenv.config();

const connectionString = 'postgressql:///blog_api';

const client = new Client({
  user: process.env.PGUSER,
  host:  process.env.PGHOST,
  database:  process.env.PGDATABASE,
  password:  process.env.PGPASSWORD,
  port:  process.env.PGPORT
});

client.connect();

client.query(
  'SELECT NOW()', (err, res) =>{
  console.log(err, res)
  client.end()
});

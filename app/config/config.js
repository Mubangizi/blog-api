
// requires
const _ = require('lodash');
dotenv = require('dotenv'),
dotenv.config();

const config = {
  "development": {
    "config_id": "development",
    "node_port": 6000,
    "db_user": process.env.DBUSER,
    "db_host": process.env.DBHOST,
    "database": "blog_api",
    "db_password":  process.env.DBPASSWORD
  },
  "testing": {
    "config_id": "testing",
    "node_port": 6000,
    "db_user": process.env.DBUSER,
    "db_host": process.env.DBHOST,
    "db_password":  process.env.DBPASSWORD,
    "database": "blog_api_test_db"
  },
  "production": {
    "config_id": "production",
    "node_port": 8080,
    "db_user": process.env.DBUSER,
    "db_host": process.env.DBHOST,
    "db_password":  process.env.DBPASSWORD,
    "database": "blog_api_production_db"
  }
};


// module variables
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;
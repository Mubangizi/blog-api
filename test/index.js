const chai = require('chai'),
chaiHttp = require('chai-http'),
should = chai.should()
require('../app/config/config.js');

appClient = global.gConfig;

chai.use(chaiHttp);
process.env.NODE_ENV = 'testing';
const server = require('../server');
console.log(appClient);


 
describe('Init', function () {
  it('check app status', function (done) {
      chai.request(server).get('/').end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      })
  });
});

describe('test database', function () {
  it('connect to database', function (done) {
    const mysql = require("mysql");
    const databaseConnetion = mysql.createConnection({
      user: appClient.db_user,
      host:  appClient.db_host,
      database:  appClient.database,
      password:  appClient.db_password,
    });

    databaseConnetion.connect(error =>{
      should.not.exist(error);
      done();
    })
    
  });
});
const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../server'),
should = chai.should();

chai.use(chaiHttp);

 
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
      user: process.env.DBUSER,
      host:  process.env.DBHOST,
      database:  process.env.DBDATABASE,
      password:  process.env.DBPASSWORD,
    });

    databaseConnetion.connect(error =>{
      should.not.exist(error);
      done();
    })
    
  });
});
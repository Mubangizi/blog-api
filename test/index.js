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

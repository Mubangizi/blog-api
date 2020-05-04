const chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../server'),
should = chai.should();

chai.use(chaiHttp);

const testPost = {
  title: " test post title",
  body: "test post body"
};

const missingTitle = {
  bodyL: "test body"
}
const invalidPost = {
  title: 7,
  body: 4
};


describe('/GET posts', () => {
  it('should Get all posts', (done) => {
      chai.request(server)
      .get('/posts')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('statusType').eq('success');
          res.body.should.be.a('object');
          done();
      });
  });
});

describe('/POST post', () => {

  it('should Check the api request without params', (done) => {
      chai.request(server)
      .post('/posts')
      .send({})
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('error');
        res.body.should.have.property('message').eql('Post content has missing required fields! eg. title and body');
        done();
      })
  });

  it('should Check the api request with missing title', (done) => {
      chai.request(server)
      .post('/posts')
      .send(missingTitle)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('error');
        res.body.should.have.property('message').eql('Post content has missing required fields! eg. title and body');
        done();
      })
  });

  it('should Check the api request with out strings', (done) => {
    chai.request(server)
    .post('/posts')
    .send(invalidPost)
    .end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('statusType').eq('error');
      res.body.should.have.property('message').eql('Title and Body fields need to be strings');
      done();
    })
  });

  it('should create a new post', (done) => {
      chai.request(server)
      .post('/posts')
      .send(testPost)
      .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('statusType').eq('success');
          res.body.should.have.property('message');
          done();
      });
  });
});
const chai = require('chai'),
chaiHttp = require('chai-http'),
should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'testing';
const server = require('../server');


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


describe('GET /posts', () => {
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

describe('POST /posts', () => {

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

// describe('/GET/:postID post', () => {

//   it('should Get a single post', (done) => {
//       chai.request(server)
//       .post('/posts/1')
//       .end((err, res) => {
//         should.not.exist(err);
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('statusType').eq('success');
//         done();
//       })
//   });

// });


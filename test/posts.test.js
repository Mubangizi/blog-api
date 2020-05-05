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
const updatePost = {
  title: "test update post title",
  body: "test update body"
}



describe('POSTS', () => {

  after(function(done) {  
    const sql = require("../app/models/database");
    sql.query("Truncate table posts;", (err, res) => {
      if (err) {
        console.log("Truncate Database error: ", err);
        result(err, null);
      }
      done();
    });
  });
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
          should.not.exist(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('statusType').eq('success');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('GET /posts/:postID', () => {

    it('should Get a single post', (done) => {
        chai.request(server)
        .get('/posts/1')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('success');
          done();
        })
    });

    it('should not Get post if not exist', (done) => {
      chai.request(server)
      .get('/posts/4')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Not Found');
        done();
      })
    });

    it('should check if post parameter is not an integer', (done) => {
      chai.request(server)
      .get('/posts/sds')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Conflict');
        done();
      })
    });
  });
  

  describe('PATCH /posts', () => {

    it('should Check the api request without params', (done) => {
        chai.request(server)
        .patch('/posts/1')
        .send({})
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('error');
          res.body.should.have.property('message').eql('Update content has missing required fields! eg. title and body');
          done();
        })
    });

    it('should Check the api request with out strings', (done) => {
      chai.request(server)
      .patch('/posts/1')
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

    it('should update a post', (done) => {
        chai.request(server)
        .patch('/posts/1')
        .send(updatePost)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('success');
          res.body.should.have.property('updatedPost');
          res.body.updatedPost.should.have.property('title').eql('test update post title');
          done();
        });
    });
  });


  describe('DELETE /posts:postID', () => {

    it('should Delete a single post', (done) => {
        chai.request(server)
        .delete('/posts/1')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('success');
          done();
        })
    });

    it('should not Delete post if not exist', (done) => {
      chai.request(server)
      .delete('/posts/4')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Not Found');
        done();
      })
    });

    it('should check if delete parameter is not an Integer', (done) => {
      chai.request(server)
      .delete('/posts/sds')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Conflict');
        done();
      })
    });
  });

  describe('DELETE /posts', () => {
    it('should Delete all posts', (done) => {
        chai.request(server)
        .delete('/posts')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('success');
          done();
        })
    });
  });
});


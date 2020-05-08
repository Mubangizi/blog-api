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

const testComment = {
  body: "test body"
}
const invalidcomment = {
  body: 4
};
const updateComment = {
  body: "test update body"
}


describe('COMMENTS', () => {

  before(function(done){
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

  after(function(done) {  
    const sql = require("../app/models/database");
    sql.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    sql.query(
      `TRUNCATE comments;`, (err, res) => {
      if (err) {
        console.log("Truncate commments table error: ", err);
        result(err, null);
      }
    });
    sql.query(
      `TRUNCATE posts;`, (err, res) => {
      if (err) {
        console.log("Truncate posts table error: ", err);
        result(err, null);
      }
    });
    sql.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    done();
  });

  describe('POST /posts/postID/comments', () => {

    it('should Check the api request without params', (done) => {
        chai.request(server)
        .post('/posts/1/comments')
        .send({})
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('error');
          res.body.should.have.property('message').eql('Comment content has missing required body fields');
          done();
        })
    });

    it('should Check the api request with out strings', (done) => {
      chai.request(server)
      .post('/posts/1/comments')
      .send(invalidcomment)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('error');
        res.body.should.have.property('message').eql('Body field needs to be a string');
        done();
      })
    });

    it('should create a new comments', (done) => {
        chai.request(server)
        .post('/posts/1/comments')
        .send(testComment)
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


  describe('GET /posts/1/comments', () => {
    it('should Get all posts', (done) => {
        chai.request(server)
        .get('/posts/1/comments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('statusType').eq('success');
          res.body.should.be.a('object');
          done();
        });
    });

    // it('should not Get comments for a non exiting post', (done) => {
    //   chai.request(server)
    //   .get('/posts/4/comments')
    //   .end((err, res) => {
    //     res.should.have.status(404);
    //     res.body.should.have.property('statusType').eq('Not Found');
    //     res.body.should.be.a('object');
    //     done();
    //   });
    // });

    it('should not Get comments for non integer post parameter', (done) => {
      chai.request(server)
      .get('/posts/asd/comments')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('statusType').eq('Conflict');
        res.body.should.be.a('object');
        done();
      });
    });
    
  });


  describe('GET /posts/:postID/comments/:commentsID', () => {

    it('should Get a single comment', (done) => {
        chai.request(server)
        .get('/posts/1/comments/1')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('statusType').eq('success');
          done();
        })
    });

    it('should not Get comment if not exist', (done) => {
      chai.request(server)
      .get('/posts/1/comments/4')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Not Found');
        done();
      })
    });

    it('should check if comment parameter is not an integer', (done) => {
      chai.request(server)
      .get('/posts/1/comments/sds')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Conflict');
        done();
      })
    });
  });
  

  describe('PATCH /posts/:postID/comments/:commentID', () => {

    it('should Check the api request without params', (done) => {
      chai.request(server)
      .patch('/posts/1/comments/1')
      .send({})
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('error');
        res.body.should.have.property('message').eql('Comment object is missing body field');
        done();
      })
    });

    it('should Check the api request with out strings', (done) => {
      chai.request(server)
      .patch('/posts/1/comments/1')
      .send(invalidcomment)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('error');
        res.body.should.have.property('message').eql('Body field needs to be a string');
        done();
      })
    });

    it('should update a comment', (done) => {
      chai.request(server)
      .patch('/posts/1/comments/1')
      .send(updateComment)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('success');
        res.body.updatedComment.should.have.property('body').eql('test update body');
        res.body.should.have.property('message').eql('Comment Updated successfully');
        done();
      })
    });
  });


  describe('DELETE /posts:postID/comments/:commentID', () => {

    it('should not Delete comment if not exist', (done) => {
      chai.request(server)
      .delete('/posts/1/comments/4')
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
      .delete('/posts/1/comments/asd')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('Conflict');
        done();
      })
    });
    it('should Delete a single comment', (done) => {
      chai.request(server)
      .delete('/posts/1/comments/1')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('statusType').eq('success');
        done();
      })
    });
  });

  describe('DELETE /posts/:postId/comments', () => {
    it("should Delete all post's comments", (done) => {
        chai.request(server)
        .delete('/posts/1/comments')
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


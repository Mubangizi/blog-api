const sql = require("./database.js");

// constructor
const Post = function(post) {
  this.title = post.email;
  this.body = post.name;
};


// Create Posts
Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("Create Post error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newPost });
  });
};


// Get all Posts
Post.getAll = result => {
  sql.query("SELECT * FROM posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Get a single post
Post.findById = (postId, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};


Post.updateById = (postId, post, result) => {
  let updateQuery = `UPDATE posts SET title = "${post.title}", body = "${post.body}" WHERE id = ${postId}`;
  if(post.title === undefined){
    updateQuery = `UPDATE posts SET body = "${post.body}" WHERE id = ${postId}`;
  }
  if(!post.body){
    updateQuery = `UPDATE posts SET title = "${post.title}" WHERE id = ${postId}`;
  }
  sql.query(
    updateQuery,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: postId, ...post });
    }
  );
};


// delete a single Post
Post.remove = (postId, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", postId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

// delete all posts
Post.removeAll = result => {
  sql.query("TRUNCATE table posts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};


module.exports = Post;

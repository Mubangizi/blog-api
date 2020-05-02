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

    console.log("created post: ", { id: res.insertId, ...newPost });
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

    console.log("posts: ", res);
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
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Post;

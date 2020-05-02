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


module.exports = Post;

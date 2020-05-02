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



module.exports = Post;

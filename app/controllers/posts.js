const Post = require("../models/posts.js");



// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send({
      posts: data
    });
  });
};


// Create and Save a new Post
exports.create = (req, res) => {
  const title = req.body.title, body = req.body.title
  // Validate request
  if (!req.body && !req.body.title && !req.body.body) {
    res.status(400).send({
      message: "Post Content is missing!"
    });
    return;
  }

  // Create a Post
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });
  console.log(post);

  // Save Post in the database
  Post.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};
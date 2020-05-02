const Post = require("../models/posts.js");

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.status(200).send({
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

  // Save Post in the database
  Post.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.status(201).send(data);
  });
};

// retrieve single post
exports.findOne = (req, res) => {
  Post.findById(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Post with id ${req.params.postId} not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with id " + req.params.postId
        });
      }
    } else res.status(200).send({
      post: data
    });
  });
};


// Update a Post identified by the postId in the request
exports.update = (req, res) => {
  // Validate Request
  if (req.body === undefined || (req.body.title === undefined  && req.body.body === undefined))  {
      res.status(400).send({
        message: "Patch content has missing params!"
      });
  }else{
    Post.updateById(
      req.params.postId,
      req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Post with id ${req.params.postId} not found.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Post with id " + req.params.postId
            });
          }
        } else res.status(200).send({
          updatedPost: data,
          message: "Post Updated successfully"
        });
      }
    );
  }
};


// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
  Post.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Post with id ${req.params.postId} not found.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Post with id " + req.params.postId
        });
      }
    } else res.status(200).send({ message: `Post was deleted successfully!` });
  });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all posts."
      });
    else res.status(200).send({ message: `All Posts were deleted successfully!` });
  });
};

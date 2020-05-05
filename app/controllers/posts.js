const Post = require("../models/posts.js");

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.status(200).send({
      statusType: "success",
      posts: data
    });
  });
};

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (req.body === undefined || (req.body.title === undefined  || req.body.body === undefined)){
    res.status(400).send({
      statusType: "error",
      message: "Post content has missing required fields! eg. title and body"
    });
    return;
  }
  if (typeof req.body.title !== 'string'  ||  typeof req.body.body !== 'string'){
    res.status(400).send({
      statusType: "error",
      message: 'Title and Body fields need to be strings'
    });
    return;
  }

  // Save Post in the database
  Post.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.status(201).send({
      statusType: "success",
      data: data,
      message: "Post created Successfully"
    });
  });
};

// retrieve single post
exports.findOne = (req, res) => {
  if(isNaN(req.params.postId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Post ids should be integers.`
    });
    return;
  }
  Post.findById(req.params.postId, (err, data) => {

    if(err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          statusType: "Not Found",
          message: `Post with id ${req.params.postId} not found.`
        });
      } else {
        res.status(500).send({
          statusType: "error",
          message: "Error retrieving Post with id " + req.params.postId
        });
      }
    } else res.status(200).send({
      statusType: "success",
      post: data
    });
  });
};


// Update a Post identified by the postId in the request
exports.update = (req, res) => {
  // Validate Request
  if (req.body === undefined || (req.body.title === undefined  && req.body.body === undefined))  {
    res.status(400).send({
      statusType: "error",
      message: "Update content has missing required fields! eg. title and body"
    });
    return;
  } else if (typeof req.body.title !== 'string'  ||  typeof req.body.body !== 'string'){
    res.status(400).send({
      statusType: "error",
      message: 'Title and Body fields need to be strings'
    });
    return;
  }else
  Post.updateById(
    req.params.postId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            statusType: "error",
            message: `Post with id ${req.params.postId} not found.`
          });
        } else {
          res.status(500).send({
            statusType: "error",
            message: "Error updating Post with id " + req.params.postId
          });
        }
      } else res.status(200).send({
        statusType: "success",
        updatedPost: data,
        message: "Post Updated successfully"
      });
    }
  );
};


// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
  if(isNaN(req.params.postId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Post ids should be integers.`
    });
    return;
  }
  Post.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          statusType: "Not Found",
          message: `Post with id ${req.params.postId} not found.`
        });
      } else {
        res.status(500).send({
          statusType: "error",
          message: "Could not delete Post with id " + req.params.postId
        });
      }
    } else res.status(200).send({ 
      statusType: "success",
      message: `Post was deleted successfully!` 
    });
  });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while deleting all posts."
      });
    else res.status(200).send({ 
      statusType: "success",
      message: `All Posts were deleted successfully!` 
    });
  });
};

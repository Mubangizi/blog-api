const Comment = require("../models/comments.js"),
Post = require("../models/posts.js");


const checkPostExits = (req, res,) =>{
  if(isNaN(req.params.postId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Post ids should be integers.`
    });
    return null;
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
      return null;
    }
  });
  
}

// Retrieve all Post Comments.
exports.findAll = (req, res) => {
  const post = checkPostExits(req, res);
  if(post === null) return;
  Comment.getAll(req.params.postId, (err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.status(200).send({
      statusType: "success",
      comments: data
    });
  });
};

// Create and Save a new Comment
exports.create = (req, res) => {
  checkPostExits(req, res);
  // Validate request
  if (req.body === undefined || req.body.body === undefined){
    res.status(400).send({
      statusType: "error",
      message: "Comment content has missing required body fields"
    });
    return;
  }
  if (typeof req.body.body !== 'string'){
    res.status(400).send({
      statusType: "error",
      message: 'Body field needs to be a string'
    });
    return;
  }

  // Save Comment in the database
  Comment.create(req.params.postId, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.status(201).send({
      statusType: "success",
      data: data,
      message: "Comment created Successfully"
    });
  });
};

// retrieve single comment
exports.findOne = (req, res) => {
  checkPostExits(req, res);
  if(isNaN(req.params.commentId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Comment ids should be integers.`
    });
    return;
  }
  Comment.findById(req.params.postId, req.params.commentId, (err, data) => {
    if(err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          statusType: "Not Found",
          message: `Comment with id ${req.params.commentId} not found.`
        });
      } else {
        res.status(500).send({
          statusType: "error",
          message: "Error retrieving Comment with id " + req.params.commentId
        });
      }
    } else res.status(200).send({
      statusType: "success",
      comment: data
    });
  });
};


// Update a Comment identified by the commentId in the request
exports.update = (req, res) => {
  checkPostExits(req, res);
  // Validate Request
  if (req.body.body === undefined)  {
    res.status(400).send({
      statusType: "error",
      message: "Comment object is missing body field"
    });
    return;
  } else if (typeof req.body.body !== 'string'){
    res.status(400).send({
      statusType: "error",
      message: 'Body field needs to be a string'
    });
    return;
  }else
  Comment.updateById(
    req.params.postId,
    req.params.commentId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            statusType: "error",
            message: `Comment with id ${req.params.commentId} not found.`
          });
        } else {
          res.status(500).send({
            statusType: "error",
            message: "Error updating Comment with id " + req.params.commentId
          });
        }
      } else res.status(200).send({
        statusType: "success",
        updatedComment: data,
        message: "Comment Updated successfully"
      });
    }
  );
};


// Delete a Comment with the specified commentId in the request
exports.delete = (req, res) => {
  checkPostExits(req, res);
  if(isNaN(req.params.commentId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Comment ids should be integers.`
    });
    return;
  }
  Comment.remove(
    req.params.postId, 
    req.params.commentId, 
    (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          statusType: "Not Found",
          message: `Comment with id ${req.params.commentId} not found.`
        });
      } else {
        res.status(500).send({
          statusType: "error",
          message: "Could not delete Comment with id " + req.params.commentId
        });
      }
    } else res.status(200).send({ 
      statusType: "success",
      message: `Comment was deleted successfully!` 
    });
  });
};

// Delete all Post comments.
exports.deleteAll = (req, res) => {
  checkPostExits(req, res);
  Comment.removeAll(
    req.params.postId,
    (err, data) => {
    if (err)
      res.status(500).send({
        statusType: "error",
        message:
          err.message || "Some error occurred while deleting all comments."
      });
    else res.status(200).send({ 
      statusType: "success",
      message: `All Comments were deleted successfully!` 
    });
  });
};

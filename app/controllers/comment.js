const Comment = require("../models/comments.js"),
Post = require("../models/posts.js"),
postId,
checkPostExits = (req, res) =>{
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
    } else 
      return data.id;
  });
}

// Retrieve all Post Comments.
exports.findAll = (req, res) => {
  postId = checkPostExits(req, res);
  Comment.getAll(postId, (err, data) => {
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
  postId = checkPostExits(req, res);
  // Validate request
  if (req.body === undefined){
    res.status(400).send({
      statusType: "error",
      message: "Comment content has missing required fields! eg. body"
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
  Comment.create(postId, req.body, (err, data) => {
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
  if(isNaN(req.params.commentId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Comment ids should be integers.`
    });
    return;
  }
  Comment.findById(req.params.commentId, (err, data) => {

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
  Comment.updateById(
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
  if(isNaN(req.params.commentId)){
    res.status(401).send({
      statusType: "Conflict",
      message: `Comment ids should be integers.`
    });
    return;
  }
  Comment.remove(req.params.commentId, (err, data) => {
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

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
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

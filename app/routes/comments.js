module.exports = app => {
  const comments = require("../controllers/comments");

  // Retrieve all Comments
  app.get("/posts/:postId/comments", comments.findAll);

  // Create a new Comment
  app.post("/posts/:postId/comments", comments.create);

  // Retrieve a single Comment with commentId
  app.get("/posts/:postId/comments/:commentId", comments.findOne);

  // Update a Comment with commentId
  app.patch("/posts/:postId/comments/:commentId", comments.update);

  // Delete a Comment with commentId
  app.delete("/posts/:postId/comments/:commentId", comments.delete);

  // Delete all Comments
  app.delete("/posts/:postId/comments", comments.deleteAll);

};
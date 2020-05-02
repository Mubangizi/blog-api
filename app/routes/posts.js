module.exports = app => {
  const posts = require("../controllers/posts");

  // Retrieve all Posts
  app.get("/posts", posts.findAll);

  // Create a new Post
  app.post("/posts", posts.create);

  // Retrieve a single Post with postId
  app.get("/posts/:postId", posts.findOne);

  // Delete a Post with postId
  app.delete("/posts/:postId", posts.delete);

  // Delete all Posts
  app.delete("/posts", posts.deleteAll);

};
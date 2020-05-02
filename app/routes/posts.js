module.exports = app => {
  const posts = require("../controllers/posts");

  // Retrieve all Posts
  app.get("/posts", posts.findAll);

  // Create a new Post
  app.post("/posts", posts.create);

};
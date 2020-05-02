module.exports = app => {
  const posts = require("../controllers/posts");

  // Create a new Customer
  app.post("/posts", posts.create);

};
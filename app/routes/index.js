const postsRoutes = require("./posts.js");

module.exports = app => {
  // simple route
  app.get("/", (req, res) => {
    res.status(200).send({ 
      message: "Welcome to Blog Api application." 
    });
  });
  postsRoutes(app)
}

const postRoutes = require('./post_routes'),
client = require("../models/database");


module.exports = function(app) {
  //root URL (/)
  app.get('/', (req, res)=> {
    res.status(200).send('App running successfully!');
  })
  postRoutes(app);
};
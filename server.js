const express = require('express'),
bodyParser = require("body-parser"),
port = process.env.PORT || 6000,
app = express();

routes = require("./app/routes");

app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
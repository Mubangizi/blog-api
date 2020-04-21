const express = require('express'),
bodyParser = require("body-parser"),
port = 50000,
app = express(),
routes = require("./routes");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

routes(app);

module.exports = app;
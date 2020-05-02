const express = require('express'),
bodyParser = require("body-parser"),
port = 50000,
app = express();
routes = require("./app/routes");

app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
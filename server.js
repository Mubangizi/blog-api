const express = require('express'),
bodyParser = require("body-parser"),
port = 50000,
app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Server is running on port ' +port);
});

 
//root URL (/)
app.get('/', (req, res)=> {
  res.status(200).send('App running successfully!');
})

module.exports = app;
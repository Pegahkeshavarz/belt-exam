var express = require("express");
var path = require("path");
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// static content
app.use(express.static(path.join(__dirname, "./client/static")));


require('./server/config/mongoose.js');

 var routes_setter = require('./server/config/routes.js');

 routes_setter(app);

app.listen(8001, function() {
  console.log("listening on port 8001");
})

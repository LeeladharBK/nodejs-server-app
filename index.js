const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "x-api-key");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const db = require("./config/db_config.js");

require("./routes/store_route.js")(app);

// Create a Server and listen at 8081
var server = app.listen(8081, () => {
  var port = server.address().port;
  console.log("App listening at port:", port);
});

// for testing
module.exports = app;

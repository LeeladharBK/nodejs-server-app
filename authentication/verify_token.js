const { KEYS } = require("../config/db_env");

// middleware to validate api key and then only process the API request
function verifyToken(req, res, next) {
  var apiKey = req.headers["x-api-key"];

  // if API_KEY is not present in the request header return HTTP 401
  if (!apiKey)
    return res.status(401).send({ auth: false, message: "API_KEY not provided." });

  // if invalid API_KEY exists in the request header return HTTP 401
  if (apiKey.toString().trim() !== KEYS.API_KEY) {
    return res
      .status(401)
      .send({ auth: false, message: "Authentiaction Failure: Invalid API_KEY." });
  }
  next();
}

module.exports = verifyToken;

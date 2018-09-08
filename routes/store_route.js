// API routes to the stores APP

module.exports = app => {
  const verifyToken = require("../authentication/verify_token");
  const customers = require("../controller/store_controller.js");

  // Retrieve all Stores by uuId
  // verifyToken is the middleware to allow only authenticated API request
  app.get("/api/stores/user/:uuId", verifyToken, customers.getStore);
};

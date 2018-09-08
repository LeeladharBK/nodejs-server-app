// Controller for Store API routes

const db = require("../config/db_config");
const validation_service = require("../service/validation_service.js");

// getStore method - will make use of the uuid from the req headers and fetch
// all the user's stores from MSSQL DB
exports.getStore = (req, res) => {
  const uuId = req.params.uuId;

  // Validation check for UserUid, if failed return HTTP 400 ERROR
  if (!validation_service.validateUuId(uuId)) {
    res.status(400).send({ message: "Invalid UserUid: Please Try Again." });
  }
  // Stored Procedure to get all Active stores
  var storedProcedure = "usp_GetAllStores";
  // making use of the existing conncection pool with MSSQL DB from db_config
  db.poolPromise
    .then(pool => {
      return pool
        .request()
        .input("UserUid", uuId)
        .execute(storedProcedure);
    })
    .then(result => {
      let rows = result.recordset;
      let json = {}; // empty Object
      let key = "uuId";
      let val = "list";
      json[key] = uuId;
      json[val] = rows; // empty Array, which you can push() values into

      res.status(200).json(json);
      db.sql.close();
    })
    .catch(err => {
      res.status(500).send({ message: `${err}` });
      db.sql.close();
    });
};

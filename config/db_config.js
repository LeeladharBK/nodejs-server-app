// MSSQL DB Configurations

const { ENV } = require("./db_env");
const sql = require("mssql/msnodesqlv8");

// return connection pool promise i.e promise
// ENV contains the DB Connection String and driver details
const poolPromise = new sql.ConnectionPool(ENV)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch(error => console.log("Database Connection Failed! ", error));

module.exports = {
  sql,
  poolPromise
};

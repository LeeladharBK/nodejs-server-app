// MSSQL driver and ConnectionString details
const ENV = {
  driver: "msnodesqlv8",
  connectionString:
    "Driver={SQL Server Native Client 11.0};Server=hme-dtc-sql-uat,5200;Database=db_qsrdrivethrucloud_engdev;Trusted_Connection=yes;"
};

// API_KEY used to authenticate API requests
const KEYS = {
  API_KEY: "12345qwerasdf"
};

module.exports = {
  ENV,
  KEYS
};

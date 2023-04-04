import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3_db",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected ...");
});

db.query("USE week3_db", (err) => {
  if (err) throw err;
});
function getPopulation(Country, name, code, cb) {
  db.query(
    `SELECT Population FROM ?? WHERE Name = ? AND code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found..."));
      cb(null, result[0].Population);
    }
  );
}

// Give an example of a value that can be passed as name and code that would take advantage of SQL-injection
// and (fetch all the records in the database):

// name = `name` OR 1=1
// code = `code` OR 1=1

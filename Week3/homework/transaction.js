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

db.query(
  `UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
`,
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Deduct 1000 from account 101...`, result);
  }
);

db.query(`START TRANSACTION`, (err, result) => {
  if (err) {
    throw err;
  }
  console.log(`Starting the TRANSACTION...`, result);
});
db.query(
  `UPDATE account SET balance = balance + 1000 WHERE account_number = 102;`,
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Deposited 1000 into the account 102...`, result);
  }
);

db.query(
  `INSERT INTO account_changes (account_number, amount, changed_date, remark)
   VALUES (101, -1000, now(), 'Transfer');`,
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`log the transfer into the account_changes table...`, result);
  }
);
db.query(
  `INSERT INTO account_changes (account_number, amount, changed_date, remark)
   VALUES (102, 1000, now(), 'Transfer');`,
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`log the transfer into the account_changes table...`, result);
  }
);

db.query(`COMMIT;`, (err, result) => {
  if (err) {
    throw err;
  }
  console.log(`The transaction is complete...`, result);
});

db.end();

import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected ...");
});

db.query("CREATE DATABASE IF NOT EXISTS week3_db", (err, result) => {
  if (err) throw err;
  console.log("database week3_db is created....");
});

db.query("USE week3_db", (err) => {
  if (err) throw err;
});

// create table account
db.query(
  `CREATE TABLE IF NOT EXISTS account
    (account_number INT AUTO_INCREMENT NOT NULL,
         balance INT, 
         PRIMARY KEY (account_number))`,
  (err, result) => {
    if (err) throw err;
    console.log("account table is created....", result);
  }
);

// create table account_changes

db.query(
  `CREATE TABLE IF NOT EXISTS account_changes
    (change_number INT AUTO_INCREMENT NOT NULL,
    account_number INT, 
    amount INT,
    changed_date DATETIME,
    remark VARCHAR(255), 
    PRIMARY KEY (change_number), 
    FOREIGN KEY (account_number) REFERENCES account(account_number))
    `,
  (err, result) => {
    if (err) throw err;
    console.log("account table is created...", result);
  }
);
db.end();

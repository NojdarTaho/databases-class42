import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3_db",
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
  `INSERT INTO account (account_number, balance) VALUES
(101, 1000),
(102, 500)
`,
  (err, result) => {
    if (err) throw err;
    console.log("rows added to account table...");
  }
);

db.query(
  `INSERT INTO account_changes
    (account_number, amount, changed_date, remark) VALUES
    (1, 100, '2023-04-01 12:00:00', 'Deposit'),
    (2, -50, '2023-03-30 09:15:00', 'Withdrawal'),
    (3, 2000, '2023-03-28 15:30:00', 'Deposit'),
    (1, -500, '2023-03-25 16:45:00', 'Withdrawal'),
    (4, 500, '2023-03-23 11:00:00', 'Deposit');
  `,
  (err, result) => {
    if (err) throw err;
    console.log("rows added to account_changes table...", result);
  }
);
db.end();

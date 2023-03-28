import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is Connected...");
});
db.query("CREATE DATABASE IF NOT EXISTS week2_db", (err, result) => {
  if (err) throw err;
  console.log("database week2_db is created...");
});

db.query("USE week2_db", (err) => {
  if (err) throw err;
});

db.query(
  "CREATE TABLE IF NOT EXISTS authors (author_id INT AUTO_INCREMENT, author_name VARCHAR(255), university VARCHAR(255), date_of_birth DATETIME, h_index INT, gender VARCHAR(255), PRIMARY KEY (author_id))",
  (err, result) => {
    if (err) throw err;
    console.log("authors table is created...", result);
  }
);

db.query(
  "ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT fk_mentor_author FOREIGN KEY (mentor) REFERENCES authors (author_id)",
  (err, result) => {
    if (err) throw err;
    console.log("mentor column is added to the table authors...", result);
  }
);
db.query(
  `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES
('J.K. Rowling', 'University of Exeter', '1965-07-31 00:00:00', 58, 'Female', 1),
('Stephen King', 'University of Maine', '1947-09-21 00:00:00', 75, 'Male', 2),
('Haruki Murakami', 'Waseda University', '1949-01-12 00:00:00', 74, 'Male', 3),
('Margaret Atwood', 'University of Toronto', '1939-11-18 00:00:00', 83, 'Female', 4),
('Neil Gaiman', 'University of Sussex', '1960-11-10 00:00:00', 62, 'Male', 5),
('Toni Morrison', 'Howard University', '1931-02-18 00:00:00', 88, 'Female', 6),
('Gabriel Garcia Marquez', 'National University of Colombia', '1927-03-06 00:00:00', 87, 'Male', 7),
('Maya Angelou', 'California Labor School', '1928-04-04 00:00:00', 86, 'Female', 8),
('Ernest Hemingway', 'University of Paris', '1899-07-21 00:00:00', 61, 'Male', 9),
('Virginia Woolf', 'Kings College London', '1882-01-25 00:00:00', 59, 'Female', 10),
('Mark Twain', 'University of Missouri', '1835-11-30 00:00:00', 74, 'Male', 11),
('Jane Austen', 'none', '1775-12-16 00:00:00', 41, 'Female', 12),
('Leo Tolstoy', 'Kazan Federal University', '1828-09-09 00:00:00', 82, 'Male', 13),
('Charlotte Bronte', 'none', '1816-04-21 00:00:00', 38, 'Female', 14),
('Edgar Allan Poe', 'University of Virginia', '1809-01-19 00:00:00', 40, 'Male', 15)`,
  (err, result) => {
    if (err) throw err;
    console.log("rows added to authors table...", result);
  }
);

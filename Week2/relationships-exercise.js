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

db.query("USE week2_db", (err) => {
  if (err) throw err;
});

db.query(
  "CREATE TABLE IF NOT EXISTS research_papers (paper_id INT AUTO_INCREMENT, paper_title VARCHAR(255), conference VARCHAR(255), publish_date DATETIME, PRIMARY KEY (paper_id))",
  (err, result) => {
    if (err) throw err;
    console.log("research_papers table is created...", result);
  }
);

// What is the relationship between Authors and Research papers?
// The relationship between Authors and Research papers is one-to-many relationship, as an authors can have more than one research paper, but then again there can be a situation where a research paper is written by more than one author. In that case it will be a many-to-many relationship.

// Making a many_to_many relationship between authors and research papers tables
db.query(
  `CREATE TABLE paper_contributors
(contributors_id INT AUTO_INCREMENT, c_author_id INT, c_paper_id INT,
PRIMARY KEY (contributors_id),
FOREIGN KEY (c_paper_id) REFERENCES research_papers(paper_id),
FOREIGN KEY (c_author_id) REFERENCES authors(author_id)
);`,
  (err, result) => {
    if (err) throw err;
    console.log("paper_contributors is created...", result);
  }
);

db.query(
  `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
  ('Paper 1', 'Conference A', '2022-01-01 00:00:00'),
  ('Paper 2', 'Conference B', '2022-02-01 00:00:00'),
  ('Paper 3', 'Conference C', '2022-03-01 00:00:00'),
  ('Paper 4', 'Conference D', '2022-04-01 00:00:00'),
  ('Paper 5', 'Conference E', '2022-05-01 00:00:00'),
  ('Paper 6', 'Conference F', '2022-06-01 00:00:00'),
  ('Paper 7', 'Conference G', '2022-07-01 00:00:00'),
  ('Paper 8', 'Conference H', '2022-08-01 00:00:00'),
  ('Paper 9', 'Conference I', '2022-09-01 00:00:00'),
  ('Paper 10', 'Conference J', '2022-10-01 00:00:00'),
  ('Paper 11', 'Conference K', '2022-11-01 00:00:00'),
  ('Paper 12', 'Conference L', '2022-12-01 00:00:00'),
  ('Paper 13', 'Conference A', '2023-01-01 00:00:00'),
  ('Paper 14', 'Conference B', '2023-02-01 00:00:00'),
  ('Paper 15', 'Conference C', '2023-03-01 00:00:00'),
  ('Paper 16', 'Conference D', '2023-04-01 00:00:00'),
  ('Paper 17', 'Conference E', '2023-05-01 00:00:00'),
  ('Paper 18', 'Conference F', '2023-06-01 00:00:00'),
  ('Paper 19', 'Conference G', '2023-07-01 00:00:00'),
  ('Paper 20', 'Conference H', '2023-08-01 00:00:00'),
  ('Paper 21', 'Conference I', '2023-09-01 00:00:00'),
  ('Paper 22', 'Conference J', '2023-10-01 00:00:00'),
  ('Paper 23', 'Conference K', '2023-11-01 00:00:00'),
  ('Paper 24', 'Conference L', '2023-12-01 00:00:00'),
  ('Paper 25', 'Conference A', '2024-01-01 00:00:00'),
  ('Paper 26', 'Conference B', '2024-02-01 00:00:00'),
  ('Paper 27', 'Conference C', '2024-03-01 00:00:00'),
  ('Paper 28', 'Conference D', '2024-04-01 00:00:00'),
  ('Paper 29', 'Conference E', '2024-05-01 00:00:00'),
  ('Paper 30', 'Conference F', '2024-06-01 00:00:00');`,
  (err, result) => {
    if (err) throw err;
    console.log("rows added to research table...", result);
  }
);

db.query(
  `INSERT INTO paper_contributors (c_paper_id, c_author_id) VALUES 
(2, 3),
(3, 3),
(4, 5),
(5, 7),
(6, 5),
(7, 4),
(8, 3),
(8, 2),
(9, 9),
(10, 10),
(12, 11),
(11, 7),
(12, 12),
(13, 2),
(14, 2),
(15, 3),
(16, 14),
(17, 15),
(18, 14),
(19, 14),
(20, 14),
(21, 14),
(22, 14),
(23, 12),
(24, 4),
(25, 4),
(26, 4),
(27, 4),
(28, 4),
(29, 4),
(30, 4),
(13, 1),
(13, 6),
(13, 8),
(13, 5),
(13, 9)
;
`,
  (err, result) => {
    if (err) throw err;
    console.log("Insert information to paper_contributors table...", result);
  }
);
db.end();

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
  `SELECT a.author_name AS author, m.author_name AS mentor
  FROM authors a
  LEFT JOIN authors m ON a.mentor = m.author_id;
  `,
  (err, result) => {
    if (err) throw err;
    console.log("Show the result of authors table...", result);
  }
);

db.query(
  `SELECT authors.author_name, research_papers.paper_title
  FROM authors
  LEFT JOIN paper_contributors ON authors.author_id = paper_contributors.c_author_id
  LEFT JOIN research_papers ON paper_contributors.c_paper_id = research_papers.paper_id;
`,
  (err, result) => {
    if (err) throw err;
    console.log(
      "Show the result of authors and research_papers table...",
      result
    );
  }
);

db.end();

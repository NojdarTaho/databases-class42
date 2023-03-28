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
  `SELECT research_papers.paper_title, COUNT(paper_contributors.c_author_id) AS contributors
FROM research_papers
LEFT JOIN paper_contributors ON research_papers.paper_id = paper_contributors.c_paper_id
GROUP BY paper_title;
`,
  (err, result) => {
    if (err) throw err;
    console.log(
      "All research papers and the number of authors that wrote that paper.",
      result
    );
  }
);

db.query(
  `SELECT COUNT(research_papers.paper_title) AS Number_of_Papers_published_by_female_authors
  FROM research_papers
  LEFT JOIN paper_contributors ON research_papers.paper_id = paper_contributors.c_paper_id
  LEFT JOIN authors ON paper_contributors.c_author_id = authors.author_id
  WHERE authors.gender = 'Female';
  `,
  (err, result) => {
    if (err) throw err;
    console.log(
      "Sum of the research papers published by all female authors.",
      result
    );
  }
);

db.query(
  `SELECT university, AVG(h_index) AS Average_h_index_per_university
  FROM authors
  GROUP BY university;
    `,
  (err, result) => {
    if (err) throw err;
    console.log(
      "Average of the h-index of all authors per university.",
      result
    );
  }
);

db.query(
  `SELECT authors.university, COUNT(paper_contributors.c_paper_id) AS Number_of_Papers_Per_University
  FROM authors
  LEFT JOIN paper_contributors ON authors.author_id = paper_contributors.c_author_id
  GROUP BY university
      `,
  (err, result) => {
    if (err) throw err;
    console.log(
      "Sum of the research papers of the authors per university.",
      result
    );
  }
);
db.query(
  `SELECT university, MIN(h_index) AS Minimum_index, MAX(h_index) AS Maximum_index
  FROM authors
  GROUP BY university
        `,
  (err, result) => {
    if (err) throw err;
    console.log(
      "Minimum and maximum of the h-index of all authors per university.",
      result
    );
  }
);
db.end();

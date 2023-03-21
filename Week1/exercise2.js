import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected...");
});

function query(sql) {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}
//
// What are the names of countries with population greater than 8 million?
query("SELECT name, Population FROM world.country WHERE Population > 8000000");

// What are the names of countries that have “land” in their names?
query("SELECT * FROM world.country WHERE Name LIKE '%land%'");

// What are the names of the cities with population in between 500,000 and 1 million?
query("SELECT * FROM world.city WHERE population BETWEEN 500000 AND 999999");

// What's the name of all the countries on the continent ‘Europe’?
query("SELECT * FROM world.country WHERE continent = 'Europe'");

// List all the countries in the descending order of their surface areas.
query("SELECT * FROM world.country ORDER BY SurfaceArea DESC");

// What are the names of all the cities in the Netherlands?
query("SELECT * FROM world.city WHERE CountryCode = 'NLD'");

// What is the population of Rotterdam?
query("SELECT population FROM world.city WHERE name = 'Rotterdam'");

// What's the top 10 countries by Surface Area?
query("SELECT name FROM world.country ORDER BY SurfaceArea DESC LIMIT 10");

// What's the top 10 most populated cities?
query(
  "SELECT name, population FROM world.city ORDER BY population DESC LIMIT 10"
);

// What is the population number of the world?
query("SELECT SUM(Population) FROM world.country");

db.end();

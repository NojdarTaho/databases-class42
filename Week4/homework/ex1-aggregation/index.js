const csvFile = require("csvtojson");
const { get } = require("http");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const url = process.env.mongodb_URI;
const nameOfCollection = "population_pyramid_1950-2022";
const csvFilePath = `population_pyramid_1950-2022.csv`;
csvFile()
  .fromFile(csvFilePath)
  .then(async (jsonArray) => {
    const modifyArray = jsonArray.map((element) => {
      return {
        Country: element.Country,
        Year: parseInt(element.Year),
        Age: element.Age,
        M: parseInt(element.M),
        F: parseInt(element.F),
      };
    });
    await uploadCSVFile(modifyArray);

    const result01 = await getTotalPopulationByYear("Afghanistan");
    console.log(result01);

    const result02 = await getContinentPopulationByYearAndAge("20-24", 1950);
    console.log(result02);
  });

async function uploadCSVFile(jsonArray) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(nameOfCollection);
    await collection.deleteMany({});
    const result = await collection.insertMany(jsonArray);
    console.log(`Inserted the data: ${result.insertedCount}`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getTotalPopulationByYear(country) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(nameOfCollection);
    const result = await collection
      .aggregate([
        {
          $match: {
            Country: country,
          },
        },
        {
          $group: {
            _id: "$Year",
            totalPopulation: {
              $sum: {
                $add: ["$M", "$F"],
              },
            },
          },
        },
        {
          $project: {
            Year: "$_id",
            totalPopulation: 1,
            _id: 0,
          },
        },
        {
          $sort: {
            Year: 1,
          },
        },
      ])
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

async function getContinentPopulationByYearAndAge(age, year) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(nameOfCollection);
    const result = await collection
      .aggregate([
        {
          $match: {
            Country: {
              $in: [
                "AFRICA",
                "EUROPE",
                "ASIA",
                "LATIN AMERICA AND THE CARIBBEAN",
                "NORTHERN AMERICA",
                "OCEANIA",
              ],
            },
            Year: year,
            Age: age,
          },
        },
        {
          $addFields: {
            TotalPopulation: {
              $sum: {
                $add: ["$M", "$F"],
              },
            },
          },
        },
      ])
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

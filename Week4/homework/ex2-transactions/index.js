require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const { setup } = require("./setup.js");
const { transaction } = require("./transfer.js");

async function main() {
  if (process.env.MongoDB_URI === null) {
    throw Error(".env is not set correctly");
  }
  const client = new MongoClient(process.env.MongoDB_URI);
  try {
    await client.connect();
    await setup(client);
    await transaction(client, 1, 2, 1);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

await main();

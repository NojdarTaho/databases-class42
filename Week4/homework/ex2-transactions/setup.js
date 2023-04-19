const accounts = [
  {
    account_number: 1,
    balance: 25,
    account_changes: [
      {
        change_number: 1,
        amount: 1,
        changed_date: new Date(),
        remark: "Initial deposit",
      },
    ],
  },
  {
    account_number: 2,
    balance: 250,
    account_changes: [
      {
        change_number: 2,
        amount: 10,
        changed_date: new Date(),
        remark: "FlyLand",
      },
    ],
  },
];

const setup = async (client) => {
  try {
    await client
      .db("databaseWeek4")
      .collection("accounts")
      .insertMany(accounts);
    console.log("accounts successfully inserted");
  } catch (err) {
    throw err;
  }
};

module.exports = { setup };

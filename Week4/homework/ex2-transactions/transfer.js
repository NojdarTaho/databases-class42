const transaction = async (client, fromAccount, toAccount, amount) => {
  const session = client.startSession();
  try {
    await session.startTransaction();

    const { account_changes: sending_changes } = await client
      .db("databaseWeek4")
      .collection("accounts")
      .findOne({ account_number: fromAccount });
    await client
      .db("databaseWeek4")
      .collection("accounts")
      .findOneAndUpdate(
        { account_number: fromAccount },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: sending_changes.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: `The transaction is Successful and the amount ${amount} successfully sent to account ${toAccount}...`,
            },
          },
        },
        { session }
      );
    const { account_changes: receiving_changes } = await client
      .db("databaseWeek4")
      .collection("accounts")
      .findOne({ account_number: toAccount });

    await client
      .db("databaseWeek4")
      .collection("accounts")
      .findOneAndUpdate(
        { account_number: toAccount },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: receiving_changes.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: `The transaction is Successful and the amount ${amount} successfully received to account ${toAccount}...`,
            },
          },
        },
        { session }
      );
    await session.commitTransaction();
    console.log("The Transaction is successful");
  } catch (err) {
    await session.abortTransaction();
    throw err;
  }
};

module.exports = { transaction };

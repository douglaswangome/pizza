const { client } = require("../config/mongo");

// Order - receipt_id, amount, paid, location, status - picked || waiting || cancelled (refund)
const COLLECTION = "orders";
// connect to orders collection
const connectToOrders = async () => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    let collection;

    if (db) {
      collection = db.collection(COLLECTION);
      return { collection };
    } else {
      console.log("Error connecting to Mongo DB");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const addToOrders = async (res, order) => {
  const { collection } = await connectToOrders();

  try {
    const response = await collection.insertOne(order);
    res
      .status(200)
      .send({
        message: "Order added successfully",
        _id: response.insertedId.toString(),
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error adding order, try again later!" });
  }
};

const fetchUserOrders = async (res, email) => {};

const fetchAllOrders = async (res) => {};

module.exports = { addToOrders };

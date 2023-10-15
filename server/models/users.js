require("dotenv").config({ path: "../.env" });
const { client } = require("../config/mongo");
const { ObjectId } = require("mongodb");

// users - name, email, phone, role, pending: {amount, avail}
const COLLECTION = "users";
// connect to users collection
const connectToUsers = async () => {
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

// Add user
const addUser = async (res, user) => {
  const { collection } = await connectToUsers();

  const existingUser = collection.findOne({ email: user.email });
  if (!existingUser) {
    try {
      const client = {
        ...user,
        phone: "",
        role: "client",
        pending: { amount: 0, avail: false },
      };
      await collection.insertOne(client);
      res
        .status(200)
        .send({ message: "Sign up successful. Sign in to continue." });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error signing up, try again later!" });
    }
  }
};

// Edit user
const editUser = async (res, details) => {
  const { collection } = await connectToUsers();

  const exisitingUser = collection.findOne({ _id: new ObjectId(details._id) });
  if (exisitingUser) {
    try {
      await collection.updateOne(
        { _id: new ObjectId(details._id) },
        {
          $set: {
            phone: details.phone,
            "pending.amount": details.amount,
            "pending.avail": details.avail,
          },
        }
      );
      res.status(200).send({ message: "Phone number updated." });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error updating!" });
    }
  }
};

// Get user
const getUser = async (res, email) => {
  const { collection } = await connectToUsers();

  try {
    const client = await collection.findOne({ email });
    res.status(200).send({ client });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "User doesn't exist!" });
  }
};

// Delete user
const deleteUser = async (res, id) => {
  const { collection } = await connectToUsers();
  try {
    const _id = new ObjectId(id);
    collection.deleteOne({ _id });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting user, try again later!" });
  }
};

module.exports = { addUser, editUser, getUser, deleteUser };

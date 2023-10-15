const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const helmet = require("helmet");
const https = require("https");
require("dotenv").config();

const { addUser, getUser, deleteUser, editUser } = require("./models/users");
const { lipaNaMpesaOnline } = require("./models/payments");
const { addToOrders } = require("./models/orders");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(helmet());

// Users
app.post("/users/add", (req, res) => addUser(res, req.body.user));
app.get("/users/fetch", (req, res) => getUser(res, req.query.email));
app.put("/users/edit", (req, res) => editUser(res, req.body.details));
app.delete("/users/delete", (req, res) => deleteUser(res, req.body._id));

// Orders
app.post("/orders/add", (req, res) => addToOrders(res, req.body.order));

// Mpesa - Daraja Payment Model
app.post("/payments/lipa-na-mpesa", (req, res) =>
  lipaNaMpesaOnline(res, req.body.details)
);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

https
  .createServer(
    {
      key: fs.readFileSync("./localhost-key.pem", "utf8"),
      cert: fs.readFileSync("./localhost.pem", "utf-8"),
    },
    app
  )
  .listen(process.env.PORT);

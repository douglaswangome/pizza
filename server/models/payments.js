// Mpesa - Daraja Payment Model
const { default: axios } = require("axios");
const moment = require("moment/moment");
require("dotenv").config({ path: "../.env" });

// Get Authentication Token
const getAuthenticationToken = async () => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = {
    username: process.env.CONSUMER_KEY,
    password: process.env.CONSUMER_SECRET,
  };
  const { data } = await axios.get(url, { auth });
  return data.access_token;
};

// Lipa Na Mpesa Online
const lipaNaMpesaOnline = async (res, details) => {
  try {
    const { amount, phone } = details;
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth_token = await getAuthenticationToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${process.env.SHORT_CODE}${process.env.PASSKEY}${timestamp}`
    ).toString("base64");
    const headers = {
      Authorization: `Bearer ${auth_token}`,
    };
    const data = {
      BusinessShortCode: process.env.SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.SHORT_CODE,
      PhoneNumber: phone,
      CallBackURL: "https://mpesa-requestbin.herokuapp.com/1g1v3j31",
      AccountReference: "Pizza Inn - Simbisa",
      TransactionDesc: "Payment of Pizza Inn - Simbisa",
    };

    const response = await axios.post(url, data, { headers });
    res.status(200).send({
      message: "Payment request sent successfully",
      response: response.data,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "An error occured during the transaction processing" });
  }
};

module.exports = { lipaNaMpesaOnline };

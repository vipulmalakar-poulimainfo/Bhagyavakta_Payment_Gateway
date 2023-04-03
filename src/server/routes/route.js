require("dotenv").config();
const express = require('express');
const router = express.Router();
const path = require("path");
const Transactions = require("../controller/transactions");

router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Instamojo Payment Gateway" });
});

router.post("/pay", Transactions.pay);

router.get("/success", (req, res) => {
    res.status(200).json({ message: "Payment Successful" });
});

router.post("/getTransactionDetails", Transactions.getTransactionDetails);

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      }
    });
});
  
module.exports = router;
require("dotenv").config();
const Insta = require("instamojo-nodejs");
const sdk = require('api')('@instamojo/v2#41q6oe7ldwso3mp');


const API_KEY = process.env.API_KEY;
const AUTH_KEY = process.env.AUTH_KEY;

Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(false);

exports.pay = (req, res) => {
    var name = req.body.data_name;
    var email = req.body.data_email;
    var amount = req.body.data_amount;
    var data = new Insta.PaymentData();
    const redirectUrl = process.env.REDIRECT_URL;
    data.setRedirectUrl(redirectUrl);
    data.send_email = "False";
    data.purpose = "Brief Horoscope Report";
    data.amount = amount;
    data.buyer_name = name;
    data.email = email;

    Insta.createPayment(data, function (error, response) {
        const result=JSON.parse(response);
        if(result.success){
            res.status(200).json({ redirectUrl: result.payment_request.longurl});
        }else{
            res.status(500).json({ message: "Payment Failed" });
        }
    });
};

exports.getTransactionDetails = (req, res) => {
    sdk.generateAccessTokenApplicationBasedAuthentication({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }, {accept: 'application/json'})
      .then(({ data }) => {
        sdk.auth(`Bearer ${data.access_token}`);
        sdk.getPaymentDetails1({id: req.body.payment_id })
        .then(({ data }) => res.status(200).json({ data }))
        .catch(err => res.status(500).json({ message: "Payment Failed" }));
      })
      .catch(err => res.status(500).json({ message: "Payment Failed" }));
}
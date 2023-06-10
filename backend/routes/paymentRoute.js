const express = require("express");
const router = express.Router();

// middlewares
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');


router.post("/process", asyncHandler(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "cny",
        metadata: {
            company: "Aubrey Mern",
        },
    });
    res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
}));

router.get("/getStripeapikey", asyncHandler(async (req, res, next) => {
    res.status(200).json({ 
        success: true,
        stripeApikey: process.env.STRIPE_API_KEY 
    });
}));


module.exports = router;
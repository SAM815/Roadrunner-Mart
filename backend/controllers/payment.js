
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/*
processPayment()

NAME
    processPayment

SYNOPSIS
    processPayment(req, res, next);

DESCRIPTION
    This function processes a payment using Stripe.
    It creates a payment intent with the specified amount and currency.
    After successfully creating the payment intent, it sends a JSON response with the client secret.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing the payment amount in the body.
    res - The response object used to send back the JSON response.
    next - The next middleware function in the stack.

RETURNS
    A JSON response indicating the success of the operation with the client secret.
*/
exports.processPayment = async (req, res, next) => {

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",


    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
}

/*
sendStripeApiKey()

NAME
    sendStripeApiKey

SYNOPSIS
    sendStripeApiKey(req, res, next);

DESCRIPTION
    This function sends the Stripe API key to the client.
    It retrieves the Stripe API key from the environment variables and sends it in a JSON response.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.
    next - The next middleware function in the stack.

RETURNS
    A JSON response containing the Stripe API key.
*/
exports.sendStripeApiKey = async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: `${process.env.STRIPE_API_KEY}`
    })
}
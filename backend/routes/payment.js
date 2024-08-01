const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/payment");
const router = express.Router();

const {isAuthenticated} = require("../middlewares/auth");

/*
Payment Routes

NAME
    Payment Routes

SYNOPSIS
    const router = express.Router();
    router.route("/payment/process").post(isAuthenticated, processPayment);
    ...

DESCRIPTION
    This module defines the routes for payment-related operations in the application.
    Each route is associated with a specific controller function and HTTP method.
    Middleware is applied to routes that require authentication.

ROUTES
    POST /payment/process
        - Processes a payment.
        - Calls the processPayment controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /stripeapikey
        - Retrieves the Stripe API key for the client.
        - Calls the sendStripeApiKey controller function.
        - Requires authentication (isAuthenticated middleware).

MIDDLEWARE
    isAuthenticated
        - Middleware to ensure the user is authenticated before accessing certain routes.

EXPORTS
    The router is exported for use in other parts of the application.
*/


router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

module.exports = router;
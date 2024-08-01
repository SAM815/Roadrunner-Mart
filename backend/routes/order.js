const express = require("express");
const router = express.Router();
const { newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,

  updateOrder } = require("../controllers/order");
const { isAuthenticated } = require("../middlewares/auth");

/*
Order Routes

NAME
    Order Routes

SYNOPSIS
    const router = express.Router();
    router.route('/order/new').post((req, res, next) => {
        console.log('Received request at /api/v1/order/new with body:', req.body);
        next();
    }, isAuthenticated, newOrder);
    ...

DESCRIPTION
    This module defines the routes for order-related operations in the application.
    Each route is associated with a specific controller function and HTTP method.
    Middleware is applied to routes that require authentication and/or authorization.

ROUTES
    POST /order/new
        - Creates a new order.
        - Logs the request body for debugging.
        - Calls the newOrder controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /orders/me
        - Retrieves the orders of the authenticated user.
        - Logs a message for debugging.
        - Calls the myOrders controller function.
        - Requires authentication (isAuthenticated middleware).

    POST /order/new (duplicate)
        - Creates a new order.
        - Calls the newOrder controller function.
        - Requires authentication (isAuthenticated middleware).
        - Note: This route appears to be a duplicate and may need to be removed.

    GET /orders/:id
        - Retrieves a single order by its ID.
        - Calls the getSingleOrder controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /admin/orders
        - Retrieves all orders (admin only).
        - Calls the getAllOrders controller function.
        - Requires authentication (isAuthenticated middleware).
        - Requires authorization with the "admin" role (authorizedRoles middleware).

    PUT /admin/order/:id
        - Updates an order by its ID (admin only).
        - Calls the updateOrder controller function.
        - Requires authentication (isAuthenticated middleware).
        - Requires authorization with the "admin" role (authorizedRoles middleware).

    DELETE /admin/order/:id
        - Deletes an order by its ID (admin only).
        - Calls the deleteOrder controller function.
        - Requires authentication (isAuthenticated middleware).
        - Requires authorization with the "admin" role (authorizedRoles middleware).

MIDDLEWARE
    isAuthenticated
        - Middleware to ensure the user is authenticated before accessing certain routes.

    authorizedRoles
        - Middleware to ensure the user has the specified roles before accessing certain routes.

EXPORTS
    The router is exported for use in other parts of the application.
*/


router.route('/order/new').post((req, res, next) => {
  console.log('Received request at /api/v1/order/new with body:', req.body);
  next();
}, isAuthenticated, newOrder);

router.route("/orders/me")
  .get((req, res, next) => {
    console.log("Reached /orders/me route");
    next();
  }, isAuthenticated, myOrders);

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/orders/:id").get(isAuthenticated, getSingleOrder);
 
router.route("/admin/orders").get(isAuthenticated,getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated, updateOrder)
  .delete(isAuthenticated, deleteOrder);


module.exports = router;


/*
Express Application Setup
DESCRIPTION
    This code sets up an Express.js application with various middleware and route configurations.
MIDDLEWARE USED
    - cookieParser: Parses cookies in incoming HTTP requests.
    - bodyParser: Parses JSON and URL-encoded data in incoming requests.
    - dotenv: Loads environment variables from a .env file.
    - cors: Enables Cross-Origin Resource Sharing (CORS) configuration for the app.
    - express.json: Parses JSON data with an increased payload limit.
    - express.urlencoded: Parses URL-encoded data.
ROUTES
    The app defines routes for user-related operations, post-related operations, order-related operations, and payment-related operations,
    all prefixed with "/api/v1".
EXPORT
    Exports the app for use in other parts of the application.
*/

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const cors = require("cors");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));




// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");
const order = require("./routes/order");
const payment = require("./routes/payment"); 



// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);






module.exports = app;
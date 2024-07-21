const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
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
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: "backend/config/config.env"});
}

//using Middlewares
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended:true}));
app.use(cookieParser());

//Importing rroutes
const user = require("./routes/user");
const post = require("./routes/post");

//using routes
app.use("/api/v1", user);
app.use("/api/v1", post);

module.exports = app;
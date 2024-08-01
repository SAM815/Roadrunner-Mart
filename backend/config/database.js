const mongoose = require("mongoose");

/*
connectDatabase()

NAME
    connectDatabase

SYNOPSIS
    connectDatabase();

DESCRIPTION
    This function connects to the MongoDB database using Mongoose.
    It retrieves the MongoDB URI from the environment variables and establishes a connection.
    If the connection is successful, it logs a message indicating the host of the connected database.
    If the connection fails, it logs the error.

RETURNS
    This function does not return a value.
*/

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
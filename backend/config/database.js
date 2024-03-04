const mongoose = require("mongoose");

exports.connectDatabase = () => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then((con) =>  console.log(`database connceted: ${con.connection.host}`))
    .catch((err) => console.log(err))
}
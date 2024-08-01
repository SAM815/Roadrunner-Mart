
/*
Application Entry Point
DESCRIPTION
    This script serves as the entry point of a Node.js application.
    It initializes and configures various components of the application.
MAIN COMPONENTS
    - Express Application: Importing and using the main Express.js application defined in "./app".
    - Environment Variables: Loading environment variables from a configuration file.
    - MongoDB Connection: Connecting to a MongoDB database using Mongoose.
    - Cloudinary Configuration: Configuring Cloudinary for cloud-based image storage.
    - Server: Starting the server and listening for incoming requests.
*/

const app = require("./app");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
// const cors = require("cors");

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



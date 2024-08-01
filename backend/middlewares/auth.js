const User = require("../models/User");
const jwt = require("jsonwebtoken");

/*
isAuthenticated()

NAME
    isAuthenticated

SYNOPSIS
    isAuthenticated(req, res, next);

DESCRIPTION
    This middleware function checks if the user is authenticated by verifying the JWT token from cookies.
    If the token is missing or invalid, it sends a JSON response asking the user to log in first.
    If the token is valid, it retrieves the user information from the database and attaches it to the request object.
    In case of an error, it sends a JSON response with the error message.

PARAMETERS
    req - The request object containing cookies with the JWT token.
    res - The response object used to send back the JSON response.
    next - The next middleware function in the stack.

RETURNS
    If authenticated, it calls the next middleware function in the stack.
    If not authenticated, it sends a JSON response asking the user to log in.
*/

exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log("isAuthenticated middleware");
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    

    
   next();

  


  } catch (error) {
    console.log("Error in isAuthenticated middleware:", error);
    res.status(500).json({
      success: false,
      message: "Server error in auth.js",
      error: error.message
    });
  }
};


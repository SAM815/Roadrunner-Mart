const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next((`Role: ${req.user.role} is not allowed to access this resource`, 403));
    };
    next();
  }
}
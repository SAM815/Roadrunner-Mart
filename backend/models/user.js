const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/*
User Schema

NAME
    User Schema

SYNOPSIS
    const userSchema = new mongoose.Schema({...});

DESCRIPTION
    This schema defines the structure for a User document in the MongoDB database.
    It includes fields for user details, password management, and token generation.

FIELDS
    name - User's name (required).

    avatar - Object containing avatar image details.
        public_id - Identifier for the avatar in the image storage service (optional).
        url - URL to access the avatar image (optional).

    email - User's email address (required, must be unique).

    password - User's password (required, minimum length of 6 characters).
        Stored hashed and not directly accessible.

    posts - Array of references to Post documents created by the user (optional).

    followers - Array of references to User documents following this user (optional).

    following - Array of references to User documents that this user is following (optional).

    role - User's role in the application (default: "user").

    seller - Boolean indicating if the user has a seller account (default: false).

    resetPasswordToken - Token used for password reset (optional).

    resetPasswordExpire - Expiration date for the reset password token (optional).

MIDDLEWARE
    pre-save Hook - Hashes the user's password before saving if it has been modified.

METHODS
    matchPassword - Compares a provided password with the hashed password in the database.
        Returns a boolean indicating if the passwords match.

    generateToken - Generates a JWT token for the user.
        Uses the user’s ID and a secret key from environment variables.

    getResetPasswordToken - Generates a token for resetting the password.
        Creates a random reset token, hashes it, and sets an expiration date.

EXPORTS
    The schema is used to create the User model, which is exported for use in other parts of the application.
*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  avatar: {
    public_id: String,
    url: String,
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  role: {
    type: String,
    default: "user"
  },
  seller: {
    type: Boolean,
    default: false,
  },
  
  
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  createSellerAccount
  
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

/*
User Routes

NAME
    User Routes

SYNOPSIS
    const router = express.Router();
    router.route("/register").post(register);
    ...

DESCRIPTION
    This module defines the routes for user-related operations in the application.
    Each route is associated with a specific controller function and HTTP method.
    Middleware is applied to routes that require authentication.

ROUTES
    POST /register
        - Registers a new user.
        - Calls the register controller function.

    POST /login
        - Logs in a user.
        - Calls the login controller function.

    GET /logout
        - Logs out a user.
        - Calls the logout controller function.

    GET /follow/:id
        - Follows or unfollows a user by ID.
        - Calls the followUser controller function.
        - Requires authentication (isAuthenticated middleware).

    PUT /update/password
        - Updates the user's password.
        - Calls the updatePassword controller function.
        - Requires authentication (isAuthenticated middleware).

    PUT /update/profile
        - Updates the user's profile.
        - Calls the updateProfile controller function.
        - Requires authentication (isAuthenticated middleware).

    DELETE /delete/me
        - Deletes the user's profile.
        - Calls the deleteMyProfile controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /me
        - Retrieves the user's profile.
        - Calls the myProfile controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /my/posts
        - Retrieves posts created by the authenticated user.
        - Calls the getMyPosts controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /userposts/:id
        - Retrieves posts created by a specific user by ID.
        - Calls the getUserPosts controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /user/:id
        - Retrieves a specific user's profile by ID.
        - Calls the getUserProfile controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /users
        - Retrieves all users matching a query.
        - Calls the getAllUsers controller function.
        - Requires authentication (isAuthenticated middleware).

    POST /forgot/password
        - Sends a password reset email to the user.
        - Calls the forgotPassword controller function.

    POST /password/reset/:token
        - Resets the user's password using a reset token.
        - Calls the resetPassword controller function.

    GET /enableuser
        - Toggles the user's seller account status.
        - Calls the createSellerAccount controller function.
        - Requires authentication (isAuthenticated middleware).

MIDDLEWARE
    isAuthenticated
        - Middleware to ensure the user is authenticated before accessing certain routes.

EXPORTS
    The router is exported for use in other parts of the application.
*/

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").post(resetPassword);

router.route("/enableuser").get(isAuthenticated, createSellerAccount);


module.exports = router;
const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
  getProductDetails,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

/*
Post Routes

NAME
    Post Routes

SYNOPSIS
    const router = express.Router();
    router.route("/post/upload").post(isAuthenticated, createPost);
    ...

DESCRIPTION
    This module defines the routes for post-related operations in the application.
    Each route is associated with a specific controller function and HTTP method.
    Middleware is applied to routes that require authentication.

ROUTES
    POST /post/upload
        - Uploads a new post.
        - Calls the createPost controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /post/:id
        - Retrieves the details of a specific post by ID.
        - Calls the getProductDetails controller function.
        - Requires authentication (isAuthenticated middleware).

    PUT /post/:id
        - Updates the caption of a specific post by ID.
        - Calls the updateCaption controller function.
        - Requires authentication (isAuthenticated middleware).

    DELETE /post/:id
        - Deletes a specific post by ID.
        - Calls the deletePost controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /like/post/:id
        - Likes or unlikes a specific post by ID.
        - Calls the likeAndUnlikePost controller function.
        - Requires authentication (isAuthenticated middleware).

    GET /posts
        - Retrieves posts of users that the authenticated user is following.
        - Calls the getPostOfFollowing controller function.
        - Requires authentication (isAuthenticated middleware).

    PUT /post/comment/:id
        - Adds a comment to a specific post by ID.
        - Calls the commentOnPost controller function.
        - Requires authentication (isAuthenticated middleware).

    DELETE /post/comment/:id
        - Deletes a comment from a specific post by ID.
        - Calls the deleteComment controller function.
        - Requires authentication (isAuthenticated middleware).

MIDDLEWARE
    isAuthenticated
        - Middleware to ensure the user is authenticated before accessing certain routes.

EXPORTS
    The router is exported for use in other parts of the application.
*/

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, getProductDetails)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router
  .route("/like/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
router.route("/posts").get(isAuthenticated, getPostOfFollowing);


router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
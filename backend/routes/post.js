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
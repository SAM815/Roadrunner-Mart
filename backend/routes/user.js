const express = require('express');
const { register,
    login,
    logout,
    getAllUsers,
    getUserProfile,
    updatePassword,
    updateProfile,
    deleteMyProfile,
    myProfile,
} = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');


const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);

module.exports = router
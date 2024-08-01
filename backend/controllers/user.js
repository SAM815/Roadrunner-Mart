const User = require("../models/User");
const Post = require("../models/Post");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Order = require("../models/Order");

/*
register()

NAME
    register

SYNOPSIS
    register(req, res);

DESCRIPTION
    This function registers a new user by creating a new entry in the database with the provided details.
    It checks if the user already exists by email. If the user exists, it returns an error message.
    If not, it uploads the avatar to Cloudinary, creates the user, and generates a token.
    The token is sent back in a cookie along with the user details.

PARAMETERS
    req - The request object containing the user registration details.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status, user details, and a token if registration is successful,
    or an error message if registration fails.
*/

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
login()

NAME
    login

SYNOPSIS
    login(req, res);

DESCRIPTION
    This function logs in a user by checking the provided email and password.
    It validates the user's credentials, generates a token, and sends it back in a cookie along with user details.
    If the user does not exist or the password is incorrect, it returns an error message.

PARAMETERS
    req - The request object containing the user login details.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status, user details, and a token if login is successful,
    or an error message if login fails.
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*
logout()

NAME
    logout

SYNOPSIS
    logout(req, res);

DESCRIPTION
    This function logs out the user by clearing the token cookie.
    It sends a response indicating that the user has been logged out.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating that the user has been logged out.
*/
exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
followUser()

NAME
    followUser

SYNOPSIS
    followUser(req, res);

DESCRIPTION
    This function handles the action of following or unfollowing a user.
    It checks if the logged-in user is already following the target user.
    If so, it unfollows the user; otherwise, it follows the user.
    It updates the respective lists of followers and following for both users.

PARAMETERS
    req - The request object containing the target user's ID in the params and the logged-in user's ID in the session.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the user was followed or unfollowed.
*/
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
updatePassword()

NAME
    updatePassword

SYNOPSIS
    updatePassword(req, res);

DESCRIPTION
    This function updates the password for the logged-in user.
    It validates the provided old password and updates it with the new password if the old password is correct.
    It sends a response indicating whether the password was updated successfully or if an error occurred.

PARAMETERS
    req - The request object containing the old and new passwords.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the password was updated successfully,
    or an error message if the update fails.
*/

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
updateProfile()

NAME
    updateProfile

SYNOPSIS
    updateProfile(req, res);

DESCRIPTION
    This function updates the profile details of the logged-in user.
    It updates the user's name, email, and avatar if provided.
    It sends a response indicating whether the profile was updated successfully or if an error occurred.

PARAMETERS
    req - The request object containing the updated profile details.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the profile was updated successfully,
    or an error message if the update fails.
*/

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar, seller } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
deleteMyProfile()

NAME
    deleteMyProfile

SYNOPSIS
    deleteMyProfile(req, res);

DESCRIPTION
    This function deletes the logged-in user's profile and associated data.
    It removes the user's avatar from Cloudinary, deletes all posts, orders, and comments associated with the user,
    and updates the followers and following lists.
    The function logs out the user by clearing the token cookie and sends a response indicating whether the profile was deleted successfully.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the profile was deleted successfully,
    or an error message if the deletion fails.
*/



exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const orders = await Order.find({ user: userId });
    for (let i = 0; i < orders.length; i++) {
      await orders[i].deleteOne();
    }

    await user.deleteOne();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.deleteOne();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
myProfile()

NAME
    myProfile

SYNOPSIS
    myProfile(req, res);

DESCRIPTION
    This function retrieves the details of the logged-in user's profile.
    It populates the user's posts, followers, and following lists and sends them in a JSON response.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and the user's profile details.
*/
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
getUserProfile()

NAME
    getUserProfile

SYNOPSIS
    getUserProfile(req, res);

DESCRIPTION
    This function retrieves the profile details of a specific user by their ID.
    It populates the user's posts, followers, and following lists and sends them in a JSON response.
    If the user is not found, it returns an error message.

PARAMETERS
    req - The request object containing the user ID in the params.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and the user's profile details,
    or an error message if the user is not found.
*/

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
getAllUsers()

NAME
    getAllUsers

SYNOPSIS
    getAllUsers(req, res);

DESCRIPTION
    This function retrieves a list of users based on the provided name query.
    It performs a case-insensitive search and sends the list of users in a JSON response.

PARAMETERS
    req - The request object containing the name query in the query parameters.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and the list of users matching the query.
*/

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const frontendHost = process.env.frontendHost;

/*
forgotPassword()

NAME
    forgotPassword

SYNOPSIS
    forgotPassword(req, res);

DESCRIPTION
    This function handles the password reset process by generating a reset token for the user.
    It sends an email with a link to reset the password. If the email is sent successfully, it returns a success message.
    If an error occurs, it clears the reset token and sends an error message.

PARAMETERS
    req - The request object containing the user's email.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the email was sent successfully,
    or an error message if the process fails.
*/

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    

    const resetUrl = `${req.protocol}://${frontendHost}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
resetPassword()

NAME
    resetPassword

SYNOPSIS
    resetPassword(req, res);

DESCRIPTION
    This function handles the actual password reset by validating the reset token and updating the user's password.
    It clears the reset token and expiration after updating the password and sends a response indicating success.

PARAMETERS
    req - The request object containing the reset token in the params and the new password in the body.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and a message indicating whether the password was updated successfully,
    or an error message if the reset token is invalid or expired.
*/

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
getMyPosts()

NAME
    getMyPosts

SYNOPSIS
    getMyPosts(req, res);

DESCRIPTION
    This function retrieves all posts created by the logged-in user.
    It populates the posts with likes and comments and sends them in a JSON response.

PARAMETERS
    req - The request object.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and the list of posts created by the user.
*/
exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        " likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
getUserPosts()

NAME
    getUserPosts

SYNOPSIS
    getUserPosts(req, res);

DESCRIPTION
    This function retrieves all posts created by a specific user by their ID.
    It populates the posts with likes and comments and sends them in a JSON response.

PARAMETERS
    req - The request object containing the user ID in the params.
    res - The response object used to send back the JSON response.

RETURNS
    A JSON response with success status and the list of posts created by the user.
*/
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      )
      
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// //Creating Seller account i.e. activating seller account

exports.createSellerAccount = async(req,res) => {
  
  try {
    const user = await User.findById(req.user._id);

    if(!user) {
      res.status(401).json({
        success: false,
        message: "User is not logged in or does not exist"
      })
    }

   user.seller = !user.seller;
   await user.save();

   res.status(201).json ({
    success: true,
    message: `User seller status ${user.seller ? "enabled": "disabled"}` 
   })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
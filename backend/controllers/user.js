const User = require("../models/user");
const Post = require("../models/post");
const {sendMail} = require("../middlewares/sendMail");
const crypto = require("crypto");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json
                ({
                    success: false,
                    message: "user already exists"
                });
        }

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sample_id",
                url: "sampleurl"
            }

        });
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res
            .status(201)
            .cookie("token", token, options)
            .json({
                success: true,
                user,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//login method
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json
                ({
                    success: false,
                    message: "User Doesn't exists"
                });
        }
        const isMatch = await user.matchPassword(password); //not yet made

        if (!isMatch) {
            return res.status(400).json
                ({
                    success: false,
                    message: "Incorrect Password"
                });
        }

        const token = await user.generateToken(); //not yet made the function

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res
            .status(200)
            .cookie("token", token, options)
            .json({
                success: true,
                user,
                token,
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}




//logout
exports.logout = async (req, res) => {
    try {

        res
            .status(200)
            .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "Logged Out",
            });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//list all users

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//fetch a user
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(500).json({
                success: false,
                message: "User not Found"
            });
        }
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update password

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide a new password"
            });
        }

        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Old Password"
            });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email } = req.body;
        if (name) {
            user.name = name;
        }
        if (email) [
            user.email = email
        ]
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

//delete Profile
exports.deleteMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const posts = user.posts;
      const followers = user.followers;
      const following = user.following;
      const userId = user._id;
  
      // Removing Avatar from cloudinary
     
  
      
  
      // Logout user after deleting profile
  
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
  
      // Delete all posts of the user
      for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]);
        
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
  
      
      
      await user.deleteOne();
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

//me
exports.myProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//follow a user
exports.followUser = async(req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if(!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(loggedInUser.following.includes(userToFollow._id)) {
            const indexOfFollowing = loggedInUser.following.indexOf(userToFollow._id);
            const indexOfFollower = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.following.splice(indexOfFollowing, 1);
            userToFollow.followers.splice(indexOfFollower, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User unfollowed"
            })
        }
        else {
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User Followed"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
}

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
      console.log(user);
      console.log("Reset password token from forgot password", resetPasswordToken);
  
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/password/reset/${resetPasswordToken}`;
  
      console.log(resetUrl);
      const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
  
      try {
        await sendMail({
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


  exports.resetPassword = async (req, res) => {
    try {

        console.log("The req.params.token from resetpassword function and link: ",req.params.token);
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
  
    
      console.log("Hashed Token:", resetPasswordToken);  // Debugging
  
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        console.log("No user found or token expired.");  // Debugging
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
      console.error("Error in resetPassword:", error.message);  // Debugging
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
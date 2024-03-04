const User = require("../models/user");

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
        await user.deleteOne();

        res
            .cookie("token", null,
                {
                    expires: new Date(Date.now()),
                    httpOnly: true,
                });
        res.status(200).json({
            success: true,
            message: "Profile Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

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
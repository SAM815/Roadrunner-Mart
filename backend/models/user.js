const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        minLength: [6, "Password must be atleast 6 characters"],
        select: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

//this will happen whenever user schema saves
userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

//creating matchPassword
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
//generate tokem
userSchema.methods.generateToken = function() {
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET )
}
module.exports = mongoose.model("User", userSchema)
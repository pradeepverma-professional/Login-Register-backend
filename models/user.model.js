const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})



userschema.methods.generateToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    return token;
}

userschema.statics.generatehashedpassword = async function (password) {
    const hashedpassword = await bcrypt.hash(password, 10)
    return hashedpassword;
}

userschema.methods.comparepassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}

const usermodel = mongoose.model("User", userschema);
module.exports = usermodel;
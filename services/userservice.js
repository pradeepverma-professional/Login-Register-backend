const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs"); 


module.exports.createuser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        return "All fields are required";
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedpassword = await usermodel.generatehashedpassword(password);
    const user = await usermodel.create({ username, email, password: hashedpassword });
    return user;
}

module.exports.loginuser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    
    const user = await usermodel.findOne({ email });
    if (!user) {
        throw new Error("Invalid User");
    }
    
    const isMatch = await user.comparepassword(password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }
    
    const token = await user.generateToken();
    return { user, token };
}

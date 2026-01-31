const userService = require("../services/userservice");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.createuser({ username, email, password });
        res.status(201).json({ message: "User registered successfully", user: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginuser({ email, password });
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = { register, login };
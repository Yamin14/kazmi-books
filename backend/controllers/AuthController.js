const User = require("../models/userModel");
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

const SignUp = async (req, res, next) => {
    try {
        const { email, password, username, role = "customer" } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({ email, password: hashedPassword, username, role });

        const token = createSecretToken(user._id, user.role);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        });

        res.status(201).json({ message: "User signed in successfully", user })

        next();

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const LogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }

        if (!user) {
            return res.json({ message: "Incorrect credentials" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect credentials" });
        }

        const token = createSecretToken(user._id, user.role);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        });

        res.status(201).json({ message: "User signed in successfully", user })

        next();

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { SignUp, LogIn };
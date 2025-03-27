const User = require("../models/userModel");
const Seller = require("../models/sellerModel");
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

const SignUp = async (req, res) => {
    try {
        const { email, password, username, role = "customer" } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate seller-specific fields
        if (role === "seller") {
            const { storeName, storeLocation } = req.body;
            if (!storeName || !storeLocation) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Store name and location are required for seller registration" 
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            email,
            password: hashedPassword,
            username,
            role
        });

        //seller only
        if (role === "seller") {
            await Seller.create({
                user: user._id,
                storeName: req.body.storeName,
                storeLocation: req.body.storeLocation
            })
        }

        //create token
        const token = createSecretToken(user._id, user.role);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'
        });

        res.status(201).json({ success: true, message: "User signed in successfully", user })

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        const token = createSecretToken(user._id, user.role);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'
        });

        res.status(201).json({ success: true, message: "User signed in successfully", user })

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const VerifyToken = async (req, res) => {
    try {
        // The user is already attached to req by the middleware
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const Logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(0) // Set expiration to past date to remove cookie
        });

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { SignUp, LogIn, VerifyToken, Logout };
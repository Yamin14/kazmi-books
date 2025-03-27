const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//middleware to verify user
const userVerification = (req, res, next) => {
    const token = req.cookies.token;
    //not signed in
    if (!token) {
        return res.status(401).json({success: false, message: "Please sign in to continue."});
    }

    //verify token
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({success: false, message: "Invalid token"});
        }

        try {
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({success: false, message: "User not found"});
            }
            
            // Attach user to request object so other routes can use it
            req.user = user;
            
            // Continue to the next middleware/route handler
            next();
            
        } catch (error) {
            return res.status(500).json({success: false, message: "Server error"});
        }
    });
}

//middleware to authorize user
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({success: false, message: "Unauthorized"});
        }
        next();
    }
}

//for approved sellers only
const isApprovedSeller = (req, res, next) => {
    if (req.user.role !== "seller" || req.user.isApproved !== true) {
        return res.status(403).json({success: false, message: "Unauthorized"});
    }
    next();
}

module.exports = { userVerification, restrictTo, isApprovedSeller };
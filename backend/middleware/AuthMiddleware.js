const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({status: false});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.json({status: false});
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.json({status: false});
        }

        return res.json({status: true, user: user});
    });
}

module.exports = { userVerification };
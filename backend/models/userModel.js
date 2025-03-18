const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "customer", "seller"], 
        default: "customer"
    }
},
{
    timestamps: true
});

const User = mongoose.model("user", userSchema);
module.exports = User;
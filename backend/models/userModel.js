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
    },
    isApproved: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

// Pre-save middleware to set isApproved based on role
userSchema.pre('save', function(next) {
    if (this.role === 'seller') {
        this.isApproved = false;
    } else {
        this.isApproved = true;
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
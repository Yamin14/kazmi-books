const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//admin account
const ensureAdminAccount = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        //get admin credentials
        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not found");
            return;
        }

        //check if admin account exists
        const admin = await User.findOne({ email: adminEmail, role: "admin" });
        if (admin) {
            console.log("Admin account already exists");
            return
        }

        //create admin account
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const newAdmin = new User({
            username: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });
        await newAdmin.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { ensureAdminAccount };
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');

//get pending sellers
const getPendingSellers = async (req, res) => {
    try {
        const pendingSellers = await User.find({role: "seller", isApproved: false});
        res.status(200).json({success: true, pendingSellers});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

//get seller details
const getSellerDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // user not found
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User Not Found"});
        }

        const seller = await Seller.findOne({user: user._id});

        // seller not found
        if (!seller) {
            return res.status(404).json({
                success: false, 
                message: "Seller Not Found"});
        }

        const pendingSeller = {
            ...user.toObject(),
            ...seller.toObject()
        }

        res.status(200).json({success: true, pendingSeller});
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = { getPendingSellers, getSellerDetails };
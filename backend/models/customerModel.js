const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
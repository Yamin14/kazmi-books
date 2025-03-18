const Book = require('../models/bookModel');

//get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

//add new book
const addBook = async (req, res) => {
    try {
        //incomplete book
        if (!req.body.title || !req.body.author || !req.body.publishYear
            || !req.body.genre || !req.body.price
        ) {
            return res.status(400).send("Send all required fields");
        }

        //create new
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            coverImage: req.file ? req.file.path.replace(/\\/g, '/') : null,
            genre: req.body.genre,
            price: Number(req.body.price),
            publishYear: Number(req.body.publishYear)};

        const book = await Book.create(newBook);

        return res.status(201).json(book);

    } catch (err) {
        return res.status(500).send({message: err.message});
    }
}

//update book
const updateBook = async (req, res) => {
    try {
        //incomplete book
        if (!req.body.title || !req.body.author || !req.body.publishYear
            || !req.body.genre || !req.body.price
        ) {
            return res.status(400).send("Send all required fields");
        }

        //find and update
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, 
            {...req.body, coverImage: req.file && req.file.path.replace(/\\/g, '/')});

        if (!result)
            return res.status(404).send("Book Not Found");

        return res.status(201).send("Book Updated Successfully");

    } catch (err) {
        return res.status(500).send({message: err.message});
    }
}

//get one book
const getOneBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

//delete book
const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result)
            return res.status(404).send("Book Not Found");

        return res.status(200).send("Book deleted successfully");

    } catch (err) {
        return res.status(500).send({message: err.message});
    }
}

module.exports = {
    addBook,
    getOneBook,
    getAllBooks,
    updateBook,
    deleteBook
}
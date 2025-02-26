import {Book} from '../models/bookModel.js';
import express from 'express';
import multer from "multer";

const router = express.Router();

//multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({storage});

//get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (err) {
        res.status(500).send({message: err.message});
    }
});

//add new book
router.post("/", upload.single('cover') ,async (req, res) => {
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
});

//update book
router.put("/:id", upload.single('cover'), async (req, res) => {
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
});

//get one book
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
});

//delete book
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result)
            return res.status(404).send("Book Not Found");

        return res.status(200).send("Book deleted successfully");

    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});

export default router;
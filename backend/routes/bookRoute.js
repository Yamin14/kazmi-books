const express = require('express');
const multer = require('multer');
const { addBook, getAllBooks, updateBook, deleteBook, getOneBook } = require('../controllers/booksController')

const router = express.Router();

//multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

//routes
router.get('/', getAllBooks)
    .post("/", upload.single('cover'), addBook)
    .put("/:id", upload.single('cover'), updateBook)
    .get("/:id", getOneBook)
    .delete("/:id", deleteBook);

module.exports = router;
const express = require('express');
const multer = require('multer');
const { userVerification } = require('../middleware/AuthMiddleware');
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
    .post("/", userVerification, upload.single('cover'), addBook)
    .put("/:id", userVerification, upload.single('cover'), updateBook)
    .get("/:id", getOneBook)
    .delete("/:id", userVerification, deleteBook);

module.exports = router;
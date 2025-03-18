const { SignUp, LogIn } = require('../controllers/AuthController');
const { userVerification } = require('../middleware/AuthMiddleware');
const router = require('express').Router();

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/", userVerification);

module.exports = router;
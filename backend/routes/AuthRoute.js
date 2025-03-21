const { SignUp, LogIn, VerifyToken, Logout } = require('../controllers/AuthController');
const { userVerification } = require('../middleware/AuthMiddleware');
const router = require('express').Router();

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/logout", userVerification, Logout);
router.post("/", userVerification, VerifyToken);

module.exports = router;
const { userVerification, restrictTo } = require('../middleware/AuthMiddleware');
const { getPendingSellers, getSellerDetails } = require('../controllers/AdminController');
const router = require('express').Router();

router.get("/pending-sellers", userVerification, restrictTo("admin"), getPendingSellers);
router.get("/pending-sellers/:id", userVerification, restrictTo("admin"), getSellerDetails);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/update', protect, updateCartItem);

module.exports = router;

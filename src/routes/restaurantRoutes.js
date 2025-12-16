const express = require('express');
const router = express.Router();
const { getRestaurants, addRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getRestaurants).post(protect, admin, addRestaurant);
router.route('/:id').delete(protect, admin, deleteRestaurant);

module.exports = router;

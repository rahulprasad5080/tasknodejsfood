const express = require('express');
const router = express.Router();
const { getFoodsByRestaurant, addFood, updateFood, deleteFood, getAllFoods } = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, admin, addFood).get(getAllFoods);
router.route('/:restaurantId').get(getFoodsByRestaurant);
router.route('/:id')
    .put(protect, admin, updateFood)
    .delete(protect, admin, deleteFood);

module.exports = router;

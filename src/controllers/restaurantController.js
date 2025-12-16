const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const addRestaurant = async (req, res) => {
    const { name, address, image, rating } = req.body;

    try {
        const restaurant = new Restaurant({
            name,
            address,
            image,
            rating
        });

        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (restaurant) {
            await restaurant.deleteOne();
            res.json({ message: 'Restaurant removed' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getRestaurants, addRestaurant, deleteRestaurant };

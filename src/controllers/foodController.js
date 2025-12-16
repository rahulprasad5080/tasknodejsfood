const Food = require('../models/Food');

// @desc    Get foods by restaurant
// @route   GET /api/foods/:restaurantId
// @access  Public
const getFoodsByRestaurant = async (req, res) => {
    try {
        const foods = await Food.find({ restaurant: req.params.restaurantId });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add food item
// @route   POST /api/foods
// @access  Private/Admin
const addFood = async (req, res) => {
    const { name, description, price, image, restaurantId, category } = req.body;

    try {
        const food = new Food({
            name,
            description,
            price,
            image,
            restaurant: restaurantId,
            category
        });

        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Update food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
    const { name, description, price, image, category } = req.body;

    try {
        const food = await Food.findById(req.params.id);

        if (food) {
            food.name = name || food.name;
            food.description = description || food.description;
            food.price = price || food.price;
            food.image = image || food.image;
            food.category = category || food.category;

            const updatedFood = await food.save();
            res.json(updatedFood);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (food) {
            await food.deleteOne();
            res.json({ message: 'Food removed' });
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find({}).populate('restaurant', 'name');
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getFoodsByRestaurant, addFood, updateFood, deleteFood, getAllFoods };

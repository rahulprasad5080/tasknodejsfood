const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalFoods = await Food.countDocuments();

    res.json({
      totalUsers,
      totalRestaurants,
      totalFoods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashboardStats };

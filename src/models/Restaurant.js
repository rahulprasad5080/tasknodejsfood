const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

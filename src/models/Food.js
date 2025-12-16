const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    category: { type: String, required: true },
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;

const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Food'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    }
}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

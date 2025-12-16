const Cart = require('../models/Cart');
const Food = require('../models/Food');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.food');
        if (cart) {
            res.json(cart);
        } else {
            res.json({ items: [], totalPrice: 0 });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [{ food: foodId, quantity }],
                totalPrice: food.price * quantity,
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ food: foodId, quantity });
            }

            // Recalculate total price
            // Need to fetch Populate or calculate iteratively. 
            // Simplified: Assume valid foodId and increment price manually carefully or re-calculate entirely.
            // Better to re-calculate entirely by populating.
            // For efficiency, just adding current op price:
            cart.totalPrice += food.price * quantity;
        }

        await cart.save();
        const fullCart = await Cart.findOne({ user: req.user._id }).populate('items.food');
        res.json(fullCart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update cart item quantity
// @route   POST /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
    const { foodId, quantity } = req.body; // quantity here is the NEW quantity, or delta? Usually new absolute quantity.

    // If quantity is 0, remove item? User request says "Update quantity". Let's assume absolute quantity.

    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.food');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.food._id.toString() === foodId);

        if (itemIndex > -1) {
            if (quantity <= 0) {
                // Remove item
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }

            // Recalculate total
            cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.food.price), 0);

            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getCart, addToCart, updateCartItem };

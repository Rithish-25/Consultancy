const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ msg: 'No items in order' });
        }

        const newOrder = new Order({
            user: req.user.id,
            items: items.map(item => ({
                product: item._id, // Assuming frontend sends product _id
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                size: item.selectedSize,
                price: item.price
            })),
            totalAmount
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

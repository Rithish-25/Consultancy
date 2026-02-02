const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

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
        console.error('Error creating order:', err.message);
        res.status(500).send('Server error');
    }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('Admin check for orders:', {
            id: req.user.id,
            found: !!user,
            email: user?.email,
            role: user?.role
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.role !== 'admin') {
            console.log('Access denied. Role is:', user.role);
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }

        const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @desc    Get current user's orders
// @route   GET /api/orders/user
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('items.product', 'name image category');
        
        res.json(orders);
    } catch (err) {
        console.error('Error fetching user orders:', err.message);
        res.status(500).send('Server error');
    }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }

        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            size: {
                type: String
            },
            price: {
                type: String, // Keeping consistent with Product model
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'Card', 'GPay']
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);

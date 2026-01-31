const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String, // Keeping as string to match frontend '₹299' format for now, or could change to Number
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    features: [String],
    fullDescription: String,
    sizes: [String],
    colors: [String],
    careInstructions: String,
    material: String,
    origin: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);

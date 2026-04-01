const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [5, "Product name must be at least 5 characters long"],
    },
    description: {
        type: String,
        minlength: [10, "Product description must be at least 10 characters long"],
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"],
    
    },
    productImage: {
        type: String,
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks', 'sides'],
        default: 'veg'
    },
    quantity: {
        type: Number,
        required: true,
        default: 10
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock status is required"],
        default: true
    }
    }, {
    timestamps: true               
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
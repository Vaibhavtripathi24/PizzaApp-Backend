const express = require('express');

const { getCartByUser, modifyProductToCart, clearCart } = require('../controllers/cartController.js');
const { isLoggedIn } = require('../validation/authValidator');
const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);
cartRouter.delete('/', isLoggedIn, clearCart);

module.exports = cartRouter;

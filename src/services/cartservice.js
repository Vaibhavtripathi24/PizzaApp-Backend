const { getCartByUserId, clearCart: clearCartByUserId } = require('../repository/cartRepository');
const { getProductById } = require('./productService');
const AppError = require('../utils/appError');
const BadRequestError = require('../utils/badRequesterror');
const NotFoundError = require('../utils/notFoundError');

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        throw new NotFoundError('Cart');
    }

    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true) {
    const cart = await getCart(userId);
    const product = await getProductById(productId);

    if (!product.inStock || product.quantity <= 0) {
        throw new BadRequestError('Product is out of stock');
    }

    let foundProduct = false;

    cart.items.forEach(item => {
        const itemProductId = item.product?._id?.toString?.() || item.product?.toString?.();

        if (itemProductId === productId) {
            if (shouldAdd) {
                if (item.quantity >= product.quantity) {
                    throw new AppError('Not enough stock for the product', 400);
                }

                item.quantity += 1;
            } else {
                if (item.quantity <= 0) {
                    throw new BadRequestError('Product quantity cannot be negative');
                }

                item.quantity -= 1;
            }

            foundProduct = true;
        }
    });

    if (!foundProduct) {
        if (shouldAdd) {
            cart.items.push({
            product: productId,
            quantity: 1
            });
        } else {
            throw new NotFoundError('Product in cart');
        }
    }

    cart.items = cart.items.filter(item => item.quantity > 0);
    await cart.save();

    return cart;
}

async function clearCart(userId) {
    const response = await clearCartByUserId(userId);
    return response;
}

module.exports = {
    getCart,
    modifyCart,
    clearCart
};

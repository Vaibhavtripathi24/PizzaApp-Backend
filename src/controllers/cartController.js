const { getCart, modifyCart, clearCart: clearUserCart } = require('../services/cartservice');
const AppError = require('../utils/appError');
const BadRequestError = require('../utils/badRequesterror');

async function getCartByUser(req, res) {
    try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            error: {},
            data: cart
        });
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error,
                data: {}
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: {},
            data: {}
        });
    }
}


async function modifyProductToCart(req, res) {
    try {
        if (!['add', 'remove'].includes(req.params.operation)) {
            throw new BadRequestError('Operation must be add or remove');
        }

        const shouldAdd = req.params.operation === 'add';
        const cart = await modifyCart(req.user.id, req.params.productId, shouldAdd);
        return res.status(200).json({
            success: true,
            message: shouldAdd ? "Product added to cart successfully" : "Product removed from cart successfully",
            error: {},
            data: cart
        });
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error,
                data: {}
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: {},
            data: {}
        });
    }
}
async function clearCart(req, res ) {
    try {
        const cart = await clearUserCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            error: {},
            data: cart
        });
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error,
                data: {}
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: {},
            data: {}
        });
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCart
};

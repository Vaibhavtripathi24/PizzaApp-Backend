const { getCart, modifyCart } = require('../services/cartservice');
const AppError = require('../utils/appError');

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


module.exports = {
    getCartByUser,
    modifyProductToCart
};

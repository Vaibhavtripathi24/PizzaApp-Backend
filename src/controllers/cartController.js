function getCartById(req, res) {
    return res.status(200).json({
        message: 'Cart route is working',
        success: true,
        data: {
            cartId: req.params.id
        },
        error: {}
    });
}

module.exports = {
    getCartById
}

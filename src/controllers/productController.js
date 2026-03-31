const AppError = require('../utils/appError');
const {
    createProduct,
    getProductById,
    deleteProductById
} = require('../services/productService');

async function addProduct(req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            productPrice: req.body.productPrice ?? req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            error: {},
            data: product
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error
            });
        }

        console.log(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        });
    }
}

async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error
            });
        }

        console.log(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error
            });
        }

        console.log(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
};

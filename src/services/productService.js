const cloudinary = require('../Config/cloudinaryConfig');
const ProductRepository = require('../repository/productRepository');
const fs = require('fs').promises;
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    let productImage;
    const imagePath = productDetails.imagePath;

    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        }
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage
    });

    if (!product) {
        throw new InternalServerError();
    }

    return product;
}
async function getProductById(productId) {
    const response = await ProductRepository.getProductById(productId);
    if (!response) {
        throw new NotFoundError('Product not found');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRepository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('Product not found');
    }
    return response;
}


module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};

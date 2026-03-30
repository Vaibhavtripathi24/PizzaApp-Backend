const cloudinary = require('../Config/cloudinaryConfig');
const ProductRepository = require('../repository/productRepository');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');
const fs = require('fs').promises;

async function createProduct(productDetails) {
    let productImage;
    const imagePath = productDetails.imagePath;

    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            productImage = cloudinaryResponse.secure_url;
            console.log(imagePath);
            await fs.unlink(process.cwd() +"/" + imagePath);
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
        throw { reason: 'Not able to create Product', statusCode: 500 };
    }

    return product;
}
async function getProductById(productId) {
    const response = await ProductRepository.getProductById(productId);
    if (!response) {
        throw new NotFoundErrorError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRepository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}


module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}

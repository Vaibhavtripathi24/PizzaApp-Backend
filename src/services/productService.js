const cloudinary = require('../Config/cloudinaryConfig');
const ProductRepository = require('../repository/productRepository');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');
const fs = require('fs/promises');
const path = require('path');

async function createProduct(productDetails) {
    let productImage;
    const imagePath = productDetails.imagePath;

    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            productImage = cloudinaryResponse.secure_url;
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        } finally {
            try {
                await fs.unlink(path.resolve(imagePath));
            } catch (unlinkError) {
                if (unlinkError.code !== 'ENOENT') {
                    console.log(unlinkError);
                }
            }
        }
    }

    const product = await ProductRepository.createProduct({
        ...productDetails,
        imagePath: undefined,
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
    const existingProduct = await ProductRepository.getProductById(productId);
    if (!existingProduct) {
        throw new NotFoundError('Product not found');
    }

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
}

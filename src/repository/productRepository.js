const Product = require('../schema/productSchema');
const BadRequestError = require('../utils/badRequesterror');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productDetails) {
    try {
      const response = await Product.create(productDetails);
      return response;
    } catch (error) {
      if (error.name === 'MongooseError') {
        throw new InternalServerError();
      } else if (error.name === 'ValidationError') {
        const errorMessageList = Object.keys(error.errors).map((property) => {
          return error.errors[property].message;
        });
        console.log(error);
        throw new BadRequestError(errorMessageList);
      }
      
    }

}
async function getProductById(productId) {
    try {
      const product = await Product.findById(productId);

      return product;
      
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestError('Invalid product id');
      }
      console.log(error);
      throw new InternalServerError();
    }
  }

  async function deleteProductById(productId) {
     try {
      const response = await Product.findByIdAndDelete(productId);
      return response;

    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestError('Invalid product id');
      }
      console.log(error);
      throw new InternalServerError();
    }
  }
  
module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};

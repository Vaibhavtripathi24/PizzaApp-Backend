const Cart = require('../schema/cartSchema');
const BadRequestError = require('../utils/badRequesterror');
const InternalServerError = require('../utils/internalServerError');
async function createcart(userId) {
    try{
        const newcart = await Cart.create({
            user: userId
    });
    return newcart;
    }catch(error){
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
              })
              throw new BadRequestError(errorMessageList);
    
    }
    console.log(error);
    throw new InternalServerError();    
}
}
async function getCartByUserId(userId) {
    try{
        const cart = await Cart.findOne({
            user: userId
        });
        return cart;

    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    createcart,
    getCartByUserId
};

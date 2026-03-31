const User = require('../schema/userSchema');

async function findUser(parameters) {
    try {
        const response = await User.findOne(parameters);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createUser(userDetails) {
    try {
        const response = await User.create(userDetails);
        return response;
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            error.statusCode = 400;
        }
        console.log(error);
        throw error;
    }
}

module.exports = {
    findUser,
    createUser
};

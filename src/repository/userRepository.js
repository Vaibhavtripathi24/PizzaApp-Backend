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
        console.log(error);
        throw error;
    }
}

module.exports = {
    findUser,
    createUser
};

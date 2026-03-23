const User = require('../schema/userSchema');

class UserRepository {
    async findUser(parameters) {
        const response = await User.findOne(parameters);
        return response;
    }

    async createUser(userDetails) {
        const response = await User.create(userDetails);
        return response;
    }
}

module.exports = UserRepository;

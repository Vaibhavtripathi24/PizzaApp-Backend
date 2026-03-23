const UserService = require('../services/userServices');
const UserRepository = require('../repository/userRepository');

async function createUser(req, res) {
    console.log("Create user Controller called");
    console.log(req.body);
    const userService = new UserService(new UserRepository());

    try {
        const response = await userService.registerUser(req.body);

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            message: error.reason || error.message || 'Unable to register user',
            success: false,
            data: {},
            error: error
        });
    }
}

module.exports = {
    createUser
}

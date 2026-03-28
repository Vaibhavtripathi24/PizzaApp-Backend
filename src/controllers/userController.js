const { registerUser } = require('../services/userServices');

async function createUser(req, res) {
    
    try {
        const response = await registerUser(req.body);

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

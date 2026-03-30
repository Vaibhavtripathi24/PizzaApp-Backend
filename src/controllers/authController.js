const {loginUser} = require("../services/authService");

async function login(req, res) {
   
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);
        res.cookie('authToken', response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: 'Login successful',
            success: true,
            data: {},
            error: {}
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Login failed',
            success: false,
            data: {},
            error: error
        });
    } 

}
    
    module.exports = {
    login           
}

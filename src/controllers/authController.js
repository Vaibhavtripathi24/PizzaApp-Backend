const { getMaxListeners } = require("../schema/userSchema");
const {loginUser} = require("../services/authService");

async function login(req, res) {
   
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);
        res.cookie('authToken', response, { httpOnly: true, secure: false, MaxAge: 7 * 24 * 60 * 60 * 1000 }); // Set cookie with token, adjust options as needed
        return res.status(200).json({
            message: 'Login successful',
            success: true,
            data: {},
            error: {}
        });

    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            data: {},
            error: error
        });
    } 

}
    
    module.exports = {
    login           
}
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config/ServerConfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"]; // Assuming the token is stored in a cookie named 'authToken'
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided",
            success: false,
            data: {},
            error: { message: "No token provided" }
        });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
            success: false,
            data: {},
            error: { message: "Invalid token" }
        });
    }
    req.user = {
        email: decoded.email,
        id: decoded.id
    }
    next(); 
    }
    module.exports = {
    isLoggedIn

}
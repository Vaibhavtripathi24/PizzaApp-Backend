const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config/ServerConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided",
            success: false,
            data: {},
            error: { message: "No token provided" }
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
            success: false,
            data: {},
            error: { message: "Invalid token" }
        });
    }
}

function isAdmin(req, res, next) {
    const loggedInUser = req.user;

    if (!loggedInUser) {
        const error = new UnauthorisedError();
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            error
        });
    }

    if (loggedInUser.role === 'ADMIN') {
        return next();
    }

    const error = new UnauthorisedError();
    return res.status(error.statusCode).json({
        success: false,
        data: {},
        message: "Unauthorized: Admin access required",
        error
    });
}

module.exports = {
    isLoggedIn,
    isAdmin
}

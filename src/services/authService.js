const { JWT_SECRET, JWT_EXPIRY } = require("../Config/ServerConfig");
const { findUser } = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const BadRequestError = require('../utils/badRequesterror');
const NotFoundError = require('../utils/notFoundError');
const UnauthorisedError = require('../utils/unauthorisedError');

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    if (!email || !plainPassword) {
        throw new BadRequestError("Email and password are required");
    }

    const user = await findUser({ email });
    if (!user) {
        throw new NotFoundError("No user found with the given email");
    }

    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValidated) {
        throw new UnauthorisedError();
    }

    const token = Jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );

    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            role: user.role
        }
    };

}  
module.exports = {
    loginUser
}

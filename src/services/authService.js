const { JWT_SECRET, JWT_EXPIRY } = require("../Config/ServerConfig");
const { findUser } = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    //1. check if there is a regitered user with the given email
    const user = await findUser({ email });
    if (!user) {
        throw {message: "No user found with the given email", statusCode: 404};
          
    }
    //2. if there is a user then we will compare the password
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValidated) {
        throw {message: "Invalid password, please try again", statusCode: 401};
    }
    //3. if password is correct then we will generate a token and send it to the user
    // const token = generateToken(user);
    // return { token, user };
    const token = Jwt.sign ({ email: user.email, id: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRY });
    return token;

}  
module.exports = {
    loginUser
}  
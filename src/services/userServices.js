const { findUser, createUser} = require('../repository/userRepository');
const BadRequestError = require('../utils/badRequesterror');
const InternalServerError = require('../utils/internalServerError');

async function registerUser(userDetails) {
    const user = await findUser({
        $or: [
            { email: userDetails.email },
                { mobileNumber: userDetails.mobileNumber }
            ]
        });

        if (user) {
            throw new BadRequestError('User with the same email or mobile number already exists');
        }

        const newUser = await createUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            password: userDetails.password,
            role: 'CUSTOMER'
        });

        if (!newUser) {
            throw new InternalServerError();
        }

        return newUser;
    }

module.exports = {
    registerUser
};

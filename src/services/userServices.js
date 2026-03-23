class UserService {

    constructor(_userRepository) {
        // in the argument we will get expect userrepository object
        this.userRepository = _userRepository;
    }

    async registerUser(userDetails) {
        // It will create a brand new user in the db.
        const user = await this.userRepository.findUser({
            $or: [
                { email: userDetails.email },
                { mobileNumber: userDetails.mobileNumber }
            ]
        });

        if (user) {
            throw {
                reason: 'User with the same email or mobile number already exists',
                statusCode: 400
            };
        }
        // 2. If user is not present then we will create a new user in the db.
        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            password: userDetails.password
        });

        if (!newUser) {
            throw {reason: 'Something went wrong, acnnot create user', statusCode: 500}
        }
        // 3. return the details of created user
        return newUser;
    }
}

module.exports = UserService;

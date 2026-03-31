const AppError = require("./appError");
class UnauthorisedError extends AppError {
    constructor() {
       super(`You are not authorised to access this resource`, 401);
    }
}

module.exports = UnauthorisedError;
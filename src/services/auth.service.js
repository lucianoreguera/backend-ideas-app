const { JwtHelper } = require('../helpers');

let _userService = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async signup(user) {
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);

        if (userExist) {
            const error = new Error();
            error.status = 401;
            error.message = 'User already exist';

            throw error;
        }

        return await _userService.create(user);
    }

    async signin(user) {
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);

        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = 'User does not exist';

            throw error;
        }

        const validPassword = userExist.comparePasswords(password);

        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = 'Invalid passwords';

            throw error;
        }

        const userToEncode = {
            id: userExist._id,
            username: userExist.username
        };

        const token = JwtHelper.generateToken(userToEncode);

        return {
            token,
            user: userExist
        };
    }
}

module.exports = AuthService;

let _authService = null;

class AuthController {
    constructor({ AuthService }) {
        _authService = AuthService;
    }

    async signup(req, res) {
        const { body } = req;
        const createdUser = await _authService.signup(body);

        return res.status(201).send(createdUser);
    }

    async signin(req, res) {
        const { body } = req;
        const credentials = await _authService.signin(body);

        console.log(credentials);

        return res.send(credentials);
    }
}

module.exports = AuthController;

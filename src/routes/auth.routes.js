const { Router } = require('express');

module.exports = function({ AuthController }) {
    const router = Router();

    router.post('/signup', AuthController.signup);
    router.post('/signin', AuthController.signin);

    return router;
};


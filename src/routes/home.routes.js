const { Router } = require('express');

// Se puede usar HomeController gracias a awilix que lo inyecta, definido en startup/container.js
module.exports = function({ HomeController }) {
    const router = Router();

    // Express en estos casos le da su scope en las llamadas pero al poner .bind() cuando registramos el controller, mantiene su propio scope
    router.get('/', HomeController.index);

    return router;
};

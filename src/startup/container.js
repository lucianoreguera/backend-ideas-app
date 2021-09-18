const { createContainer, asValue, asClass, asFunction } = require('awilix');
const config = require('../config');

const { HomeService } = require('../services');

const { User, Idea, Comment } = require('../models');

const { HomeController } = require('../controllers');
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

const app = require('.');

const container = createContainer();

// Crear clase de inyeccion
// Ya se puede usar en ls controller, entoces cuando lo requieran awilix inyecta la clase de servicio
container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
}).register({
    HomeService: asClass(HomeService).singleton()
}).register({
    // Se agrega el .bind() ya que express cambia el scope para llamarlo y necesitamos el mismo scope
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton()
}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
});

module.exports = container;

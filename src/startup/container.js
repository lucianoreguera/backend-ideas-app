const { createContainer, asValue, asClass, asFunction } = require('awilix');
const config = require('../config');

const { HomeService, UserService, IdeaService, CommentService, AuthService } = require('../services');

const { User, Idea, Comment } = require('../models');

const { HomeController, UserController, IdeaController, CommentController, AuthController } = require('../controllers');

const { UserRepository, IdeaRepository, CommentRepository } = require('../repositories');

const { HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes } = require('../routes/index.routes');
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
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    AuthService: asClass(AuthService).singleton()
}).register({
    // Se agrega el .bind() ya que express cambia el scope para llamarlo y necesitamos el mismo scope
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton()
}).register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
}).register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
});

module.exports = container;

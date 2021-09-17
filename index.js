const container = require('./src/startup/container');
const mongoose = require('mongoose');

const server = container.resolve('app');
const { MONGO_URI } = container.resolve('config');

// mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URI)
    .then(() => server.start())
    .catch(error => console.log(error));

'use strict';

const Hapi = require('@hapi/hapi');

require('dotenv').config({ path: '.env' });
const Routes = require('./config/routes');

const server = Hapi.Server({ port: process.env.PORT, host: 'localhost' });

server.route(Routes);

exports.init = async () => {

    await server.initialize();
    return server;
};

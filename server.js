'use strict';

const Hapi = require('@hapi/hapi');
require('dotenv').config({ path: '.env' })
const routes = require('./config/routes')

const server = Hapi.Server({ port: process.env.PORT, host: 'localhost' });

server.route(routes)

exports.init = async () => {
    await server.initialize();
    return server;
}

exports.start = async () => {
    await server.start();
    console.log(`Server started on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})
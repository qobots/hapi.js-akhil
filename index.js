'use strict';

const Hapi = require('@hapi/hapi');
require('dotenv').config({ path: '.env' })
const routes = require('./config/routes')

const init = async () => {
    const server = Hapi.Server({ port: process.env.PORT, host: 'localhost' });

    server.route(routes)

    await server.start();
    console.log(`Server started on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
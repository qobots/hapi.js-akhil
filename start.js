'use strict';

const { init } = require('./server');

const start = async () => {

    const server = await init();
    await server.start();
    console.log(`Server started on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();

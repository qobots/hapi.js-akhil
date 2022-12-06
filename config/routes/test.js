'use strict';

const Boom = require('boom');
const { validateTestPostchema, validateTestReplacePostchema } = require('../validators/test');

module.exports = [
    {
        method: 'GET',
        path: '/test',
        handler: function (_request, reply) {

            const data = { success: true, message: 'Welcome to test get API' };

            return reply.response(data).code(200);
        }
    },
    {
        method: 'GET',
        path: '/test/random',
        handler: function (_request, reply) {

            const random = Math.round(Math.random() * 10000000000);
            const data = { success: true, random };

            return reply.response(data).code(200);
        }
    },
    {
        method: 'POST',
        path: '/test',
        handler: function (request, reply) {

            const { error } = validateTestPostchema(request.payload);

            if (error) {
                throw Boom.badData(error);
            }

            const name = request.payload.name;
            const email = request.payload.email;
            const phone = request.payload.phone;

            const dateTime = new Date().toLocaleString();

            const data = { status: true, name, email, phone, dateTime };

            return reply.response(data).code(200);
        }
    },
    {
        method: 'POST',
        path: '/test/replace',
        handler: function (request, reply) {

            const { error } = validateTestReplacePostchema(request.payload);

            if (error) {
                throw Boom.badData(error);
            }

            const replacedText = String(request.payload.text).replace(String(request.payload.replaceFrom), String(request.payload.replaceTo));

            const data = { status: true, replacedText };

            return reply.response(data).code(200);
        }
    }
];

const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/test',
        handler: function (_request, reply) {
            const data = { success: true, message: 'Welcome to test get API' }

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
            const name = request.payload.name;
            const email = request.payload.email;
            const phone = request.payload.phone;

            if (!name)
                throw Boom.notFound('Name not found');

            if (!String(email)?.toLowerCase()?.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
                throw Boom.badRequest('Invalid Email');

            if (!String(phone)?.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
                throw Boom.badRequest('Invalid Phone');

            const dateTime = new Date().toLocaleString();

            const data = { status: true, name, email, phone, dateTime }

            return reply.response(data).code(200);
        }
    },
    {
        method: 'POST',
        path: '/test/replace',
        handler: function (request, reply) {
            if (!request.payload?.text)
                throw Boom.notFound('String not found')

            if (!request.payload?.replaceFrom)
                throw Boom.notFound('ReplaceFrom not found')

            if (!request.payload?.replaceTo)
                throw Boom.notFound('ReplaceTo not found')

            const replacedText = String(request.payload.text).replace(String(request.payload.replaceFrom), String(request.payload.replaceTo));

            const data = { status: true, replacedText }

            return reply.response(data).code(200);
        }
    }
]
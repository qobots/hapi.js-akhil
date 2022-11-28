const Boom = require('boom');

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
            if (!request.payload?.username)
                throw Boom.notFound('Username not found')

            const username = request.payload.username;
            const dateTime = new Date().toLocaleString();

            const data = { status: true, username, dateTime }

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

                const replacedText = request.payload.text.replace(request.payload.replaceFrom, request.payload.replaceTo);

            const data = { status: true, replacedText }

            return reply.response(data).code(200);
        }
    }
]
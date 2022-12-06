'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');

describe('GET /test', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with 200', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/test'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with success and a message', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/test'
        });
        expect(res.result).to.equal({ success: true, message: 'Welcome to test get API' });
    });
});

describe('GET /test/random', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with 200', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/test/random'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('POST /test', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with status, name, email, phone and dateTime', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'john@gmail.com', phone: '8786565456' }
        });
        expect(res.result).to.equal({
            status: true,
            name: 'John',
            email: 'john@gmail.com',
            phone: '8786565456',
            dateTime: res.result.dateTime
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com', phone: 8786565456 }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"phone" must be a string'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: {}
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"name" is required. "email" is required. "phone" is required'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail', phone: 8786565456 }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"email" must be a valid email. "phone" must be a string'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com', phone: '786565456' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"phone" length must be 10 characters long'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"phone" is required'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', phone: '7876565456' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"email" is required'
        });
    });
});

describe('POST /test/replace', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with status & replaced text from text, replaceFrom, replaceTo', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 'I am a developer.', replaceFrom: 'developer', replaceTo: 'tester' }
        });
        expect(res.result).to.equal({ status: true, replacedText: 'I am a tester.' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 'I am a developer.', replaceTo: 'tester' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"replaceFrom" is required'
        });
    });

    it('responds with 404', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: {}
        });
        expect(res.statusCode).to.equal(422);
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { replaceFrom: 'developer', replaceTo: 'tester' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"text" is required'
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 'I am a developer.', replaceFrom: 'developer' }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"replaceTo" is required'
        });
    });

    it('responds with status & replaced text from text, replaceFrom, replaceTo', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 10101101010, replaceFrom: 11, replaceTo: 10 }
        });
        expect(res.result).to.equal({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: '"text" must be a string. "replaceFrom" must be a string. "replaceTo" must be a string'
        });
    });
});

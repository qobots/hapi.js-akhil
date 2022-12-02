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
            status: true, name: 'John',
            email: 'john@gmail.com',
            phone: '8786565456',
            dateTime: new Date().toLocaleString()
        });
    });

    it('responds with status, name, email, phone and dateTime', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com', phone: 8786565456 }
        });
        expect(res.result).to.equal({
            status: true,
            name: 'John',
            email: 'John@Gmail.com',
            phone: 8786565456,
            dateTime: new Date().toLocaleString()
        });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: {}
        });
        expect(res.result).to.equal({ statusCode: 404, error: 'Not Found', message: 'Name not found' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail', phone: 8786565456 }
        });
        expect(res.result).to.equal({ statusCode: 400, error: 'Bad Request', message: 'Invalid Email' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com', phone: '786565456' }
        });
        expect(res.result).to.equal({ statusCode: 400, error: 'Bad Request', message: 'Invalid Phone' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John', email: 'John@Gmail.com' }
        });
        expect(res.result).to.equal({ statusCode: 400, error: 'Bad Request', message: 'Invalid Phone' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { name: 'John',  phone: '7876565456' }
        });
        expect(res.result).to.equal({ statusCode: 400, error: 'Bad Request', message: 'Invalid Email' });
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
            statusCode: 404,
            error: 'Not Found',
            message: 'ReplaceFrom not found'
        });
    });

    it('responds with 404', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: {}
        });
        expect(res.statusCode).to.equal(404);
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { replaceFrom: 'developer', replaceTo: 'tester' }
        });
        expect(res.result).to.equal({ statusCode: 404, error: 'Not Found', message: 'String not found' });
    });

    it('responds by throwing exception contains statusCode, error and message', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 'I am a developer.', replaceFrom: 'developer' }
        });
        expect(res.result).to.equal({ statusCode: 404, error: 'Not Found', message: 'ReplaceTo not found' });
    });

    it('responds with status & replaced text from text, replaceFrom, replaceTo', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/test/replace',
            payload: { text: 10101101010, replaceFrom: 11, replaceTo: 10 }
        });
        expect(res.result).to.equal({ status: true, replacedText: '10101001010' });
    });
});
'use strict';

const Joi = require('joi');

const testPostchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});

const testReplacePostchema = Joi.object({
    text: Joi.string().required(),
    replaceFrom: Joi.string().required(),
    replaceTo: Joi.string().required()
});

exports.validateTestPostchema = (payload) => {

    return testPostchema.validate(payload, { abortEarly: false });
};


exports.validateTestReplacePostchema = (payload) => {

    return testReplacePostchema.validate(payload, { abortEarly: false });
};

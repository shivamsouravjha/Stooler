import Joi from '@hapi/joi';

export default {
    createAccount : Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().required(),
        email: Joi.string().required(),
        panNumber: Joi.string().required(),
        aadhar: Joi.string().required(),
    })
}
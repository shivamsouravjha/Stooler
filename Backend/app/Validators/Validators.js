import Joi from '@hapi/joi';

export default {
    createAccount : Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().required(),
        email: Joi.string().required(),
        panNumber: Joi.string().required(),
        aadhar: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    loginAccount : Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    groupCreate : Joi.object().keys({
        groupName: Joi.string().required(),
        description: Joi.string().required(),
        genre: Joi.string().required(),
        duration: Joi.string().required(),
        amount: Joi.number().required(),
    }),
    groupJoin : Joi.object().keys({
        amount: Joi.number().required(),
        groupId: Joi.string().required(),
    }),
}
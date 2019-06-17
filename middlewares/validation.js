const Joi = require('@hapi/joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    employeeSchemas: {
        authenticationSchema: Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 }),
            password: Joi.string().required().min(8).max(30)
        }),
        registrationSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required().min(8).max(30)
        }),
    },
    agencySchemas: {
        createAgencySchema: Joi.object().keys({
            name: Joi.string().required(),
            address: Joi.string().required()
        }),
        updateAgencySchema: Joi.object().keys({
            name: Joi.string().required(),
            address: Joi.string().required(),
            agencyID: Joi.number().required()
        }),
        assignEmployeesToAgenciesSchema: Joi.object().keys({
            employeeID: Joi.number().required(),
            agencyID: Joi.number().required(),  
        }),
    }
}
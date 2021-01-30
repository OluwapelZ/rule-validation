const joi = require('joi');
const { failed } = require('../../utils/http_response');
const RESPONSE_CODES = require('../../config/response_codes');
const logger = require('../../logger');

class RequestValidation {
    constructor() {}

    firstLevelValidation(req, res, next) {
        const firstLevelSchema = joi.object({
            data: joi.alternatives()
                .try(joi.string(), joi.array(), joi.object())
                .required(),
            rule: joi.object().keys({
                field: joi.string().required(),
                condition: joi.string().required(),
                condition_value: joi.number().required(),
            }).required(),
        });

        const {error} = firstLevelSchema.validate(req.body);

        if (error) {
            logger.error(`Error validating request data first level details: ${error.message}`);
            return failed(res, RESPONSE_CODES.bad_request, (error.message).split('\"').join('') + '.');
        }

        return next();
    }
}

module.exports = RequestValidation
const logger = require('../logger');
const { success, failed } = require('../utils/http_response');
const RESPONSE_CODES = require('../config/response_codes');
const ResponseMessage = require('../config/response_messages');
const CONSTANTS = require('../config/constant');
const RuleValidationService = require('../service/rule.validation.service');
const { InvalidFieldNestingLevel, MissingDataFieldError } = require('../errors');

class RuleController {
    fetchPersonnalData(req, res) {
        logger.info('Fetching SE\'s personal/contact information');
        return success(res, RESPONSE_CODES.successful, ResponseMessage.RULE_VALIDATION_API, CONSTANTS.PERSONAL_DATA);
    }

    validateRule(req, res) {
        try {
            const validationResult = new RuleValidationService().validateRule(req.body.rule, req.body.data);

            return (validationResult.error) ? success(res, RESPONSE_CODES.bad_request, `field ${req.body.rule.field} failed validation`, { validation: validationResult }) :
            success(res, RESPONSE_CODES.successful, `field ${req.body.rule.field} successfully validated`, {validation: validationResult});
        } catch (error) {
            if (error instanceof InvalidFieldNestingLevel)
                return failed(res, RESPONSE_CODES.bad_request, error.message);

            if (error instanceof MissingDataFieldError)
                return failed(res, RESPONSE_CODES.bad_request, error.message);

            return failed(res, RESPONSE_CODES.server_error, `Internal Server Error: ${error}`);
        }
    }
}

module.exports = RuleController;

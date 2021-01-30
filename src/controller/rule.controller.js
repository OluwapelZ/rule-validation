const logger = require('../logger');
const { success, failed } = require('../utils/http_response');
const RESPONSE_CODES = require('../config/response_codes');
const ResponseMessage = require('../config/response_messages');
const CONSTANTS = require('../config/constant');
const RuleValidationService = require('../service/rule.validation.service');

class RuleController {
    fetchPersonnalData(req, res) {
        logger.info('Fetching SE\'s personal/contact information');
        return success(res, RESPONSE_CODES.successful, ResponseMessage.RULE_VALIDATION_API, CONSTANTS.PERSONAL_DATA);
    }

    validateRule(req, res) {
        try {
            const completedValidation = new RuleValidationService().validateRule(req.body.rule, req.body.data);

            return (completedValidation.error) ? failed(res, RESPONSE_CODES.bad_request, `field ${req.body.rule.field} failed validation`) :
            success(res, RESPONSE_CODES.successful, `field ${req.body.rule.field} successfully validated`, {validation: completedValidation});
        } catch (error) {

        }
    }
}

module.exports = RuleController;

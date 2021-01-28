const logger = require("../logger");
const { success } = require("../utils/http_response");
const RESPONSE_CODES = require('../config/response_codes');
const ResponseMessage = require("../config/response_messages");
const CONSTANTS = require("../config/constant");

class RuleController {
    async fetchPersonnalData(req, res) {
        logger.info('Fetching SE\'s personal/contact information');
        return success(res, RESPONSE_CODES.successful, ResponseMessage.RULE_VALIDATION_API, CONSTANTS.PERSONAL_DATA);
    }

    async validateRule(req, res) {
        return success(res, RESPONSE_CODES.successful, ResponseMessage.RULE_VALIDATION_API, CONSTANTS.PERSONAL_DATA);
    }
}

module.exports = RuleController;

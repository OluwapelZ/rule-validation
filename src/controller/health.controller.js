const logger = require("../logger");
const { success } = require("../utils/http_response");
const RESPONSE_CODES = require('../config/response_codes');
const ResponseMessage = require("../config/response_messages");

class HealthController {
    async healthCheck(req, res) {
        logger.info('Service Health Check');
        return success(res, RESPONSE_CODES.successful, ResponseMessage.HEALTH_CHECK_SUCCESS_MESSAGE, null);
    }
}

module.exports = HealthController;

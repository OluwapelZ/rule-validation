const { encrypt } = require('../utils/crypt');
const config = require('../config/config');
const CONSTANTS = require('../config/constant');
const { mapErrorResponse } = require('../utils/mapper');

function success(res, statusCode, message, data=null) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.SUCCESSFUL, message: message, data: data});
};

function failed(res, statusCode, message, stack) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.FAILED, message: message, error: stack});
};

module.exports = { success, failed }
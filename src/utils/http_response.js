const CONSTANTS = require('../config/constant');

/**
 * Generic JSEND Response Structure
 */
function success(res, statusCode, message, data=null) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.SUCCESSFUL, message: message, data: data});
};

function failed(res, statusCode, message) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.FAILED, message: message, data: null});
};

module.exports = { success, failed }
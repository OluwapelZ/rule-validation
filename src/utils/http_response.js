const CONSTANTS = require('../config/constant');

function success(res, statusCode, message, data=null) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.SUCCESSFUL, message: message, data: data});
};

function failed(res, statusCode, message, stack) {
    res.status(statusCode).send({status: CONSTANTS.REQUEST_STATUSES.FAILED, message: message, data: null});
};

module.exports = { success, failed }
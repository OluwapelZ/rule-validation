const { encrypt, decrypt } = require('../utils/crypt');
const { getLoanStatus, sendOTP } = require('../utils/third_party_api_call');
const { getLoanStatusMapper } = require('../utils/mapper');
const { generateOTP, readFromStorageFile, writeToStorageFile } = require('../utils/util');
const config = require('../config/config');
const CONSTANTS = require('../config/constant');
const ResponseMessage = require('../config/respnose_messages');
const { success, failed, waitingForOTP, wrongAuthProvder } = require('../utils/http_response');

async function getStatus(req, res) {
    try {
        const loanRequestPayload = JSON.parse(decrypt(config.crypt_key, req.body.data));
        const transaction = loanRequestPayload.transaction;
        const otp = generateOTP();

        if (loanRequestPayload.auth.auth_provider != config.provider_name) {
            wrongAuthProvder(res, CONSTANTS.REQUEST_STATUSES.FAILED, ResponseMessage.INVALID_AUTH_PROVIDER_NAME);
        }
        
        if (loanRequestPayload.request_mode == CONSTANTS.REQUEST_TYPES.TRANSACT) {
            const loanStatusResponse =  await getStatusFromMigo(transaction.customer.customer_ref);

            if (loanRequestPayload.transaction.details.otp_override == true || loanRequestPayload.transaction.app_info.extras.otp_override == true) {
                success(res, CONSTANTS.STATUS_CODES.SUCCESS, ResponseMessage.FETCHED_LOAN_STATUS_SUCCESSFULLY, getLoanStatusMapper(loanStatusResponse));
            }

            // Send OTP verification sms
            sendOTPSms(transaction.customer.mobile_no, transaction.customer.surname, otp);

            // Save response in File storage with otp
            writeToStorageFile(otp, transaction.customer.mobile_no, encrypt(config.crypt_key, JSON.stringify({
                status: CONSTANTS.REQUEST_STATUSES.SUCCESSFUL,
                message: ResponseMessage.FETCHED_LOAN_STATUS_SUCCESSFULLY,
                data: getLoanStatusMapper(loanStatusResponse)
            })));

            //Send response
            waitingForOTP(res, CONSTANTS.STATUS_CODES.WAITING_FOR_OTP, ResponseMessage.SUCCESSFULLY_SENT_OTP);
        } else if (loanRequestPayload.request_mode == CONSTANTS.REQUEST_TYPES.VALIDATE) {
            const customer = loanRequestPayload.transaction.customer;
            const data = validateOTP(customer.otp, customer.mobile_no);

            if (data) {
                success(res, CONSTANTS.STATUS_CODES.SUCCESS, 'Transaction Processes Successfully', data);
            }

            failed(res, CONSTANTS.STATUS_CODES.FAILED, ResponseMessage.INVALID_OTP);
        }
    } catch (error) {
        console.log(error);
        failed(res, CONSTANTS.STATUS_CODES.FAILED, error.stack);
    }
}

function getStatusFromMigo(customerRef) {
    return getLoanStatus(customerRef);
}

function validateOTP(otp, phoneNumber) {
    const data = readFromStorageFile(otp, phoneNumber);
    return data;
}

function sendOTPSms(phone, surname, otp) {
    try {
        const smsData = {
            senderName: 'OnePipe - Verify OTP',
            recipientPhoneNumber: phone,
            message: `Hello ${surname}, the otp for your get loans request is: ${otp}. Please contact us if you did not initiate this request`
        };
    
        return sendOTP(smsData);
    } catch (error) {
        throw error;
    }
}

module.exports = { getStatus }
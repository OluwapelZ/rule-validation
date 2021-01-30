const express = require('express');
const router = express.Router();
const RequestValidator = require('../middleware/validations/request.data.validation');

const RuleController = require('../controller/rule.controller');
const HealthController = require('../controller/health.controller');
const ruleController = new RuleController();
const healthController = new HealthController();
const requestValidator = new RequestValidator();

/**
 * Health and Personal Contact Details Endpoints
 */
router.get('/health', healthController.healthCheck);
router.get('/', ruleController.fetchPersonnalData);

/**
 * Rule Validation Endpoints
 */
router.post('/validate-rule', requestValidator.firstLevelValidation, ruleController.validateRule);

module.exports = router;

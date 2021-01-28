const express = require('express');
const router = express.Router();

const RuleController = require('../controllers/rule.controller');
const HealthController = require('../controllers/health.controller');
const ruleController = new RuleController();
const healthController = new HealthController();

/**
 * Health and Personal Contact Details Endpoints
 */
router.get('/health', healthController.healthCheck);
router.get('/', ruleController.fetchPersonnalData);

/**
 * Rule Validation Endpoints
 */
router.post('/validate-rule', ruleController.validateRule);

module.exports = router;

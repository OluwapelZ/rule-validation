const { VALIDATION_CONDITION } = require("../config/constant");
const { InvalidFieldNestingLevel, MissingDataFieldError } = require("../errors");
const logger = require("../logger");
const { mapValidationResponse } = require("../mapper/rule.validation.mapper");

class RuleValidationService {
    constructor() {}

    validateRule(rule, data) {
        const nestedLevels = rule.field.split('.');
        
        if (nestedLevels.length > 2) {
            logger.error(`Invalid field nesting level: Field nesting cannot be greater than 2`);
            throw new InvalidFieldNestingLevel('Field nesting cannot be greater than 2');
        }

        const field = (nestedLevels[1]) ? nestedLevels[1] : nestedLevels[0];
        const dataField = (nestedLevels.length > 1) ? data[nestedLevels[0]][nestedLevels[1]] : data[nestedLevels[0]];
        
        if (!dataField) {
            logger.error(`Feild ${(field)} is missing from data.`)
            throw new MissingDataFieldError(`Feild ${(field)} is missing from data.`);
        }

        return mapValidationResponse(
            rule.field,
            rule,
            dataField,
            !this._validationCondition(dataField, rule.condition, rule.condition_value
            ));
    }

    _validationCondition(fieldValue, condition, conditionValue) {
        switch(condition) {
            case VALIDATION_CONDITION.equal:
                return fieldValue === conditionValue;
            case VALIDATION_CONDITION.not_equal:
                return fieldValue !== conditionValue;
            case VALIDATION_CONDITION.greater:
                return fieldValue > conditionValue;
            case VALIDATION_CONDITION.greater_or_equal:
                return fieldValue >= conditionValue;
            case VALIDATION_CONDITION.contains: // There's no context to understand what contains condition mean
                return fieldValue - conditionValue > 0;
            default:
                return false
        }
    }
}

module.exports = RuleValidationService;
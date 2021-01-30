const mapValidationResponse = (field, rule, field_value, isValid) => {
    return {
        error: isValid,
        field,
        field_value: field_value,
        condition: rule.condition,
        condition_value: rule.condition_value
    }
}

module.exports = {
    mapValidationResponse
}
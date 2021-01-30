const createCustomError = require('custom-error-generator');

const InvalidFieldNestingLevel = createCustomError('Invalid_Field_Nesting_Level', { code: 'INVALID_FIELD_NESTING_LEVEL' });
const MissingDataFieldError = createCustomError('Missing_Data_Field', { code: 'MISSING_DATA_FIELD' });

module.exports = {
    InvalidFieldNestingLevel,
    MissingDataFieldError
}
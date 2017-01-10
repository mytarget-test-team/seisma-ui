'use strict';


export let greaterZeroValidator = (value) => parseInt(value) >= 1 || parseFloat(value) >= 0.1;


export default function formatAndValidateObject(object, validationSchema) {
    /*
        Return format: {
            value: 'real value',
            isValid: 'true or false',
            message: 'validation error message is isValid equal false'
        }

        validation schema should has format: {
            keyForValidation: {
                validator: 'function what wait value for validation',
                message: 'validation error message'
            }
        }
     */
    let formattedObject = {};
    let objectKeys = Object.keys(object);

    for (let key of objectKeys) {
        let value = object[key];
        let schema = validationSchema[key];

        if (!schema || !value) {
            formattedObject[key] = {
                value: value,
                isValid: true,
            };
            continue
        }

        let isValid = schema.validator(value);

        formattedObject[key] = {
            value: value,
            isValid: isValid,
            message: schema.message || 'Is not valid value'
        }
    }

    return formattedObject
}

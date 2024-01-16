import { body, ValidationChain } from 'express-validator';

interface FieldValidation {
    name: string;
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    isNumeric?: boolean;
    errorMessage: string;
}

const validationArray: FieldValidation[] = [
    { name: 'username', required: true, minLength: 5, errorMessage: 'Username is required and must be at least 5 characters long' },
    { name: 'email', required: true, pattern: /\S+@\S+\.\S+/, errorMessage: 'Invalid email address' },
    { name: 'password', required: true, minLength: 8, errorMessage: 'Password is required and must be at least 8 characters long' },
    { name: 'contact_name', required: true, errorMessage: 'Contact Name is required' },
    { name: 'role_id', required: true, isNumeric: true, errorMessage: 'role id is required and should be numeric' }
    // Add more fields as needed
];

export const validateFields = (fields: string[]): ValidationChain[] => {
    return fields.map((fieldName) => {
        const validation = validationArray.find(field => field.name === fieldName);
        if (validation) {
            const chain = body(validation.name);

            if (validation.required) {
                chain.notEmpty().withMessage(`Field ${fieldName} is required`);
            }

            if (validation.minLength !== undefined) {
                chain.isLength({ min: validation.minLength }).withMessage(`Field ${fieldName} must be at least ${validation.minLength} characters long`);
            }

            if (validation.pattern !== undefined) {
                chain.matches(validation.pattern).withMessage(`Field ${fieldName} does not match the required pattern`);
            }
            chain.escape();
            return chain.withMessage(validation.errorMessage);
        }
        throw new Error(`Validation for field ${fieldName} not found`);
    });
};

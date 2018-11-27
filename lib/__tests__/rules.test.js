const createJSONSchemaRules = require('../index.js');

describe('JSON-Rules', () => {
    let validate;
    // let addOperator;
    // let addAlias;
    let schema;

    beforeEach(() => {
        ({validate /* , addOperator, addAlias */} = createJSONSchemaRules({}));

        schema = {
            $schema: 'http://json-schema.org/draft-07/schema#',
            $id: 'http://json-schema.org/draft-07/schema#',
            title: 'Non-shape validation',
            type: 'object',
            properties: {
                password: {
                    description: 'User password',
                    type: 'string'
                },
                confirmPassword: {
                    description: 'User password',
                    type: 'string'
                },
                age: {
                    description: "User's age",
                    type: 'integer'
                }
            },
            required: ['password', 'confirmPassword'],
            rules: [
                {
                    description: 'Ensure passwords match',
                    rule: ['==', '$.password', '$.confirmPassword'],
                    error: 'Passwords must match'
                },
                {
                    description: 'Ensure user is 18 or over',
                    rule: ['>=', '$.age', 18],
                    error: 'User must be 18 or over'
                }
            ]
        };
    });

    it('should return an empty array in no error are found', () => {
        const data = {
            password: 'foo',
            confirmPassword: 'foo',
            age: '18'
        };
        const errors = validate(schema, data);

        expect(errors.length).toEqual(0);
    });

    it('should return an error for a single failed rule', () => {
        const data = {
            password: 'foo',
            confirmPassword: 'foo',
            age: '17'
        };
        const errors = validate(schema, data);

        expect(errors.length).toEqual(1);
    });

    it('should return errors for multiple failed rules', () => {
        const data = {
            password: 'foo',
            confirmPassword: 'bar',
            age: '17'
        };
        const errors = validate(schema, data);

        expect(errors.length).toEqual(2);
    });
});

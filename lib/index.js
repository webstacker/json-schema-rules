const createJSONRules = require('json-rules');

function createJSONSchemaRules() {
    const jr = createJSONRules();
    const errors = [];

    function validate(schema, data) {
        const {rules} = schema;

        if (Array.isArray(rules)) {
            rules.forEach(ruleObj => {
                const result = jr.evaluate(ruleObj.rule, data);

                if (!result) {
                    errors.push(ruleObj.error);
                }
            });
        } else {
            throw Error(`Expected rules to be Array, instead received: ${rules}`);
        }

        return errors;
    }

    return Object.freeze({
        validate,
        addOperator: jr.addOperator,
        addAlias: jr.addAlias
    });
}

module.exports = createJSONSchemaRules;

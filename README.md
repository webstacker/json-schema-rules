# json-schema-rules
Apply additional rules to JSON Schema

## Usage

### Schema
```json

```

### Validate

```js
const jsr = require('json-schema-rules')();

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://json-schema.org/draft-07/schema#",
    "title": "Extended validation",
    "type": "object",
    "properties": {
        "password": {
            "description": "User password",
            "type": "string"
        },
        "confirmPassword": {
            "description": "User password",
            "type": "string"
        },
        "age": {
            "description": "User's age",
            "type": "integer"
        }
    },
    "required": ["password", "confirmPassword", "age"],
    "rules": [
        {
            "description": "Ensure passwords match",
            "rule": ["==", "$.password", "$.confirmPassword"],
            "error": "Passwords must match"
        },
        {
            "description": "Ensure user is 18 or over",
            "rule": [">=", "$.age", 18],
            "error": "User must be 18 or over"
        }
    ]
};

const data = {
    password: 'foo',
    confirmPassword: 'bar',
    age: '17'
};

const errors = jsr.validate(schema, data);

// errors = [ 'Passwords must match', 'User must be 18 or over' ]

```



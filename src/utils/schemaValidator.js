const { queryForCreate } = require("./middlewareHandlres");

/* function typeValidate(schemaType, toValidate) {
  if (schema.type && typeof schemaType(toValidate) !== typeof toValidate) {
    return {
      attribute,
      error: `Type must be ${typeof schemaType(toValidate[attribute])} and is ${typeof toValidate[attribute]}`
    }
  }
} */

class Validator {

  Schema;
  schemaAttribute;

  constructor(schema) {
    this.Schema = schema;
    this.schemaAttribute = Object.keys(this.Schema);
  }

  check(toValidate) {

    let result = {
      error: false,
      message: []
    };
    const objLength = this.schemaAttribute.length;


    for (let i = 0; i <= objLength - 1; i++) {

      const attribute = Object.keys(this.Schema)[i];
      const schema = this.Schema[attribute];
      const validate = toValidate[attribute];
      /* console.log(i, schema, attribute, toValidate[attribute]); */

      if (schema.required && !toValidate[attribute]) {
        result.error = true;
        result.message.push({
          attribute,
          error: `attribute ${attribute} is required`
        })
      }

      if (!toValidate[attribute]) continue;

      if (schema.type && typeof schema.type(validate) !== typeof validate) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Type must be ${typeof schema.type(validate)} and is ${typeof validate}`
        })
      }

      if (!schema.length) continue;

      if (schema.length.min && schema.length.min > validate.length) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Is too short`
        })
      }

      if (schema.length.max && schema.length.max < validate.length) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Is too long`
        })
      }
    }
    return result;
  }
}

module.exports = Validator;
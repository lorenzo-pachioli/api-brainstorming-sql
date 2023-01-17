const { isIdInteger } = require("./inputsValidator");

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

      // new object doesn't have a required item  
      if (schema.required && !toValidate[attribute]) {
        result.error = true;
        result.message.push({
          attribute,
          error: `attribute ${attribute} is required`
        })
      }

      //If new object doesn't has an item but has a default value, It's added to the object 
      if (!toValidate[attribute] && schema.default) {
        toValidate[attribute] = schema.default;
        continue;
      }

      //If new object doesn't has an item, loop continues with the next attribute
      if (!toValidate[attribute]) continue;

      // Object attribute is correct type
      if (schema.type && typeof schema.type(validate) !== typeof validate) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Type must be ${typeof schema.type(validate)} and is ${typeof validate}`
        })
      }

      //If new object doesn't has length rules, it continues with the next
      if (!schema.length) continue;

      //new object has min length rule
      if (schema.length.min && schema.length.min > validate.length) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Is too short`
        })
      }

      //new object has max length rule
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

  checkFilter(toValidate) {

    let result = {
      error: false,
      message: []
    };
    const objLength = Object.keys(toValidate).length;

    for (let i = 0; i <= objLength - 1; i++) {
      const attribute = Object.keys(toValidate)[i];
      const schema = this.Schema[attribute];
      const validate = toValidate[attribute];

      //if filter is id then must be integer
      if (attribute === 'id' && !isIdInteger(validate)) {
        result.error = true;
        result.message.push({
          attribute,
          error: `id must be an integer`
        });
        continue;
      }
      // filter passed doesn't belong to schema
      if (!schema) {
        result.error = true;
        result.message.push({
          attribute,
          error: `attribute ${attribute} doesn't exist in schema`
        })
      }

      // Object attribute is correct type
      if (schema.type && typeof schema.type(validate) !== typeof validate) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Type must be ${typeof schema.type(validate)} and is ${typeof validate}`
        })
      }

      //If new object doesn't has length rules, it continues with the next
      if (!schema.length) continue;

      //new object has min length rule
      if (schema.length.min && schema.length.min > validate.length) {
        result.error = true;
        result.message.push({
          attribute,
          error: `Is too short`
        })
      }

      //new object has max length rule
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
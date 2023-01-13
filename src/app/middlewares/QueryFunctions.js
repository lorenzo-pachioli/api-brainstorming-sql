const Middlewares = require('./Middlewares');
/* const Validator = require('schema-validator'); */
const { isIdInteger } = require('../../utils/inputsValidator');
const Validator = require('../../utils/schemaValidator');
const middleware = new Middlewares;

class QueryFuctions {

  schemaValidator;

  constructor(table) {
    this.table = table;
  }

  newSchema(schema) {
    this.schemaValidator = new Validator(schema);
  }

  async createModel(model) {
    const valid = this.schemaValidator.check(model);
    console.log('valid', valid.error);
    if (valid.error) throw new Error(`Invalid ${this.table} schema`);
    return model;
  }

  /*   async validateCampus(model) {
      const setQuery = queryForCreate(model);
      const valid = this.schemaValidator.check(model);
      console.log(setQuery, 'item', Object.keys(valid), Object.keys(valid).find(item => item === setQuery));
      return valid;
    } */

  async findAll(callback) {
    const result = await middleware.getAllTable(this.table, callback);
    return result;
  }

  async findById(id, callback) {
    if (isIdInteger(id)) throw new Error(`Invalid id type`);
    const result = await middleware.getAllMatchs(this.table, { id }, callback);
    return result;
  }

  async find(info, callback) {
    const result = await middleware.getAllMatchs(this.table, info, callback);
    return result;
  }

  async findOne(info, callback) {
    const result = await middleware.getAllMatchs(this.table, info, callback);
    return result[0];
  }

  async findInSet(filter, value, callback) {
    const result = await middleware.getInSet(this.table, filter, value, callback);
    return result;
  }

  async findOneAndUpdate(filter, update, callback) {
    const model = this.createModel(update);
    const result = await middleware.getOneAndUpdate(this.table, filter, model, callback);
    return result;
  }

  async save(item, callback) {
    const model = await this.createModel(item);
    await middleware.newItem(this.table, model, () => { });
    const result = await middleware.getAllMatchs(this.table, model, callback);
    return result;
  }

  async deleteById(id, callback) {

    if (isIdInteger({ id })) throw new Error(`Invalid id type`);
    const result = await middleware.deleteItem(this.table, id, callback);
    return result;
  }
}

module.exports = QueryFuctions;
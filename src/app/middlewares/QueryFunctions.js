const Middlewares = require('./Middlewares');
const { isIdInteger } = require('../../utils/inputsValidator');
const Validator = require('../../utils/schemaValidator');
const middleware = new Middlewares;

/* 
x Model.deleteMany()
x Model.deleteOne()
x Model.find()
x Model.findById()
x Model.findByIdAndDelete()
x Model.findOne()
x Model.findOneAndUpdate()
x Model.updateMany()
x Model.save() */

class Model {

  schemaValidator;

  constructor(table, schema) {
    this.table = table;
    this.schemaValidator = new Validator(schema);
  }

  async createModel(model) {
    const valid = this.schemaValidator.check(model);
    console.log('valid', valid.error);
    if (valid.error) throw new Error(`Invalid ${this.table} schema`);
    return model;
  }

  async findById(id, callback) {
    if (isIdInteger(id)) throw new Error(`Invalid id type`);
    const result = await middleware.getAllMatchs(this.table, { id }, callback);
    return result[0];
  }

  async find(info = {}, callback) {

    if (Object.keys(info).length === 0) {
      const result = await middleware.getAllTable(this.table, callback);
      return result;
    }
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
    if (result.affectedRows > 0) {
      const newItem = await middleware.getAllMatchs(this.table, filter, callback);
      return newItem[0];
    }
    return;
  }

  async updateMany(filter, update, callback) {

    const itemsToUpdate = await this.find(filter);
    if (itemsToUpdate.length === 0) return { error: true, msg: 'No matchs found' };
    const ids = itemsToUpdate.map(item => item.id);

    /* const model = this.createModel(update); */
    const result = await middleware.updateMany(this.table, ids, update, callback);
    if (result.affectedRows > 0) return itemsToUpdate;
    return;
  }

  async save(item, callback) {
    const model = await this.createModel(item);
    await middleware.newItem(this.table, model, () => { });
    const result = await middleware.getAllMatchs(this.table, model, callback);
    return result;
  }

  async findByIdAndDelete(id, callback) {
    if (isIdInteger({ id })) throw new Error(`Invalid id type`);
    const result = await middleware.deleteItem(this.table, id, callback);
    return result;
  }

  async deleteOne(filter, callback) {
    const item = this.findOne(filter);
    if (!item) return { error: true, msg: 'No matchs found' }
    const result = await middleware.deleteItem(this.table, item.id, callback);
    return result;
  }

  async deleteMany(filter, callback) {

    const itemsToDelete = await this.find(filter);
    if (itemsToDelete.length === 0) return { error: true, msg: 'No matchs found' };
    const ids = itemsToDelete.map(item => item.id);

    /* const model = this.createModel(update); */
    const result = await middleware.deleteMany(this.table, ids, callback);
    console.log(result);
    if (result.affectedRows > 0) return itemsToDelete;
    return;
  }
}

module.exports = Model;
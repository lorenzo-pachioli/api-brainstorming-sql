const Middlewares = require('./Middlewares');
const { isIdInteger } = require('../../utils/inputsValidator');
const Validator = require('../../utils/schemaValidator');
const middleware = new Middlewares;

/* 
x Model.find()
x Model.findOne()
x Model.findById()
x Model.findByIdAndDelete()
x Model.findOneAndUpdate()
x Model.updateMany()
x Model.deleteMany()
x Model.deleteOne()
x Model.save() */

class Model {

  schemaValidator;

  constructor(table, schema) {
    this.table = table;
    this.schemaValidator = new Validator(schema);
  }

  async findById(id, callback) {
    const validFilter = this.schemaValidator.checkFilter({ id: id });
    if (validFilter.error) return validFilter.message;

    const result = await middleware.getAllMatchs(this.table, { id }, callback);
    return result[0];
  }

  async find(filter = {}, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    if (Object.keys(filter).length === 0) {
      const result = await middleware.getAllTable(this.table, callback);
      return result;
    }
    const result = await middleware.getAllMatchs(this.table, filter, callback);
    return result;
  }

  async findOne(filter, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const result = await middleware.getAllMatchs(this.table, filter, callback);
    return result[0];
  }

  async findInSet(filter, value, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const result = await middleware.getInSet(this.table, filter, value, callback);
    return result;
  }

  async findOneAndUpdate(filter, update, callback) {
    const model = this.schemaValidator.check(update);
    if (model.error) return validFilter.message;

    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const result = await middleware.getOneAndUpdate(this.table, filter, update, callback);
    if (result.affectedRows > 0) {
      const newItem = await middleware.getAllMatchs(this.table, filter, callback);
      return newItem[0];
    }
    return;
  }

  async updateMany(filter, update, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const itemsToUpdate = await this.find(filter);
    if (itemsToUpdate.length === 0) return { error: true, msg: 'No matchs found' };
    const ids = itemsToUpdate.map(item => item.id);

    const result = await middleware.updateMany(this.table, ids, update, callback);
    if (result.affectedRows > 0) return itemsToUpdate;
    return;
  }

  async save(item, callback) {
    const model = this.schemaValidator.check(update);
    if (model.error) return validFilter.message;

    await middleware.newItem(this.table, model, () => { });
    const result = await middleware.getAllMatchs(this.table, model, callback);
    return result;
  }

  async findByIdAndDelete(id, callback) {
    const validFilter = this.schemaValidator.checkFilter({ id: id });
    if (validFilter.error) return validFilter.message;

    const result = await middleware.deleteItem(this.table, id, callback);
    return result;
  }

  async deleteOne(filter, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const item = this.findOne(filter);
    if (!item) return { error: true, msg: 'No matchs found' }
    const result = await middleware.deleteItem(this.table, item.id, callback);
    return result;
  }

  async deleteMany(filter, callback) {
    const validFilter = this.schemaValidator.checkFilter(filter);
    if (validFilter.error) return validFilter.message;

    const itemsToDelete = await this.find(filter);
    if (itemsToDelete.length === 0) return { error: true, msg: 'No matchs found' };
    const ids = itemsToDelete.map(item => item.id);

    /* const model = this.createModel(update); */
    const result = await middleware.deleteMany(this.table, ids, callback);
    if (result.affectedRows > 0) return itemsToDelete;
    return;
  }
}

module.exports = Model;
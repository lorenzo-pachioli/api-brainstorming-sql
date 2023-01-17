const Middlewares = require('./Middlewares');
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

function response(content, callback = (error, result) => { }) {
  callback(null, content);
  return content;
}

class Model {

  schemaValidator;

  constructor(table, schema) {
    this.table = table;
    this.schemaValidator = new Validator(schema);
  }

  async findById(id, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter({ id: id });
      if (validFilter.error) return response(validFilter.message, callback);

      const result = await middleware.getAllMatchs(this.table, { id }, callback);
      return response(result[0], callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async find(filter = {}, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      if (Object.keys(filter).length === 0) {
        const result = await middleware.getAllTable(this.table, callback);
        return response(result, callback);
      }

      const result = await middleware.getAllMatchs(this.table, filter, callback);
      return response(result, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async findOne(filter, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const result = await middleware.getAllMatchs(this.table, filter, callback);
      return response(result[0], callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async findInSet(filter, value, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const result = await middleware.getInSet(this.table, filter, value, callback);
      return response(result, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async findOneAndUpdate(filter, update, callback) {
    try {
      const model = this.schemaValidator.check(update);
      if (model.error) return response(validFilter.message, callback);

      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const result = await middleware.getOneAndUpdate(this.table, filter, update, callback);
      if (result.affectedRows > 0) {
        const newItem = await middleware.getAllMatchs(this.table, filter, callback);
        return response(newItem[0], callback);
      }
      return response(`Couldn't update ${this.table}`, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async updateMany(filter, update, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const itemsToUpdate = await this.find(filter);
      if (itemsToUpdate.length === 0) return response('No matchs found', callback);
      const ids = itemsToUpdate.map(item => item.id);

      const result = await middleware.updateMany(this.table, ids, update, callback);
      if (result.affectedRows > 0) return response(itemsToUpdate, callback);
      return response(`Couldn't update ${this.table}`, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async save(item, callback) {
    try {
      const model = this.schemaValidator.check(item);
      if (model.error) return response(model.message, callback);

      await middleware.newItem(this.table, model, () => { });
      const result = await middleware.getAllMatchs(this.table, model, callback);
      return response(result, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async findByIdAndDelete(id, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter({ id: id });
      if (validFilter.error) return response(validFilter.message, callback);

      const result = await middleware.deleteItem(this.table, id, callback);
      return response(result, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async deleteOne(filter, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const item = this.findOne(filter);
      if (!item) return response('No matchs found', callback);
      const result = await middleware.deleteItem(this.table, item.id, callback);
      return response(result, callback);
    } catch (error) {
      callback(error, null);
      return error;
    }
  }

  async deleteMany(filter, callback) {
    try {
      const validFilter = this.schemaValidator.checkFilter(filter);
      if (validFilter.error) return response(validFilter.message, callback);

      const itemsToDelete = await this.find(filter);
      if (itemsToDelete.length === 0) return response('No matchs found', callback);
      const ids = itemsToDelete.map(item => item.id);

      const result = await middleware.deleteMany(this.table, ids, callback);
      if (result.affectedRows > 0) return response(itemsToDelete, callback);
      return;
    } catch (error) {
      callback(error, null);
      return error;
    }
  }
}

module.exports = Model;
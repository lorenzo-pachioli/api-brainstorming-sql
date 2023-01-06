const Middlewares = require('./Middlewares');

const middleware = new Middlewares;

class QueryFuctions {

  constructor(table) {
    this.table = table;
  }

  async findAll(callback) {
    const result = await middleware.getAllTable(this.table, callback);
    return result;
  }

  async findById(id, callback) {
    const result = await middleware.getAllMatchs(this.table, { id }, callback);
    return result;
  }

  async find(info, callback) {
    const result = await middleware.getAllMatchs(this.table, info, callback);
    return result;
  }

  async findInSet(filter, value, callback) {
    const result = await middleware.getInSet(this.table, filter, value, callback);
    return result;
  }

  async findOneAndUpdate(filter, update, callback) {
    const result = await middleware.getOneAndUpdate(this.table, filter, update, callback);
    return result;
  }

  async save(item, callback) {
    await middleware.newItem(this.table, item, () => { });
    const result = await middleware.getAllMatchs(this.table, item, callback);
    return result;
  }

  async deleteOne(id, callback) {
    const result = await middleware.deleteItem(this.table, id, callback);
    return result;
  }
}

module.exports = QueryFuctions;
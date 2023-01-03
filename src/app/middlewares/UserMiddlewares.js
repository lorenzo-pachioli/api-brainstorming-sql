const Middlewares = require('./Middlewares');

const middleware = new Middlewares;

class User {

  table = 'user';

  async findAll(callback) {
    const result = await middleware.getAll(this.table, callback);
    return result;
  }

  async findById(id, callback) {
    const result = await middleware.getOne(this.table, { id }, callback);
    return result;
  }

  async findOne(userInfo, callback) {
    const result = await middleware.getOne(this.table, userInfo, callback);
    return result;
  }

  async findOneAndUpdate(filter, update) {
    const result = await middleware.getOneAndUpdate(this.table, filter, update);
    return result;
  }

  async save(item, callback) {
    await middleware.newItem(this.table, item, () => { });
    const result = await middleware.getOne(this.table, item, callback);
    return result;
  }

  async deleteOne(id, callback) {
    const result = await middleware.deleteItem(this.table, id, callback);
    return result;
  }
}

module.exports = User;
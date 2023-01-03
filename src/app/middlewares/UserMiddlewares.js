const Middlewares = require('./Middlewares');

class User extends Middlewares {

  table = 'user';

  findById(id, callback) {
    this.getById(this.table, id, callback);
  }

  findOne(userInfo, callback) {
    this.getOne(this.table, userInfo, callback);
  }

  findOneAndUpdate(filter, update) {
    this.getOneAndUpdate(this.table, filter, update);
  }

  save(item, callback) {
    this.newItem(this.table, item, () => { });
    this.getOne(this.table, item, callback);
  }

  deleteOne(id, callback) {
    this.deleteItem(this.table, id, callback);
  }
}

module.exports = User;
const { queryForSelect, valuesArray, queryForUpdate, queryForCreate } = require('../../utils/middlewareHandlres');
const { db } = require('../../config/dbConnection');

class Middlewares {

  getById(table, id, callback) {
    db.query(`select * from ${table} where id = ?;`, [id], (err, result) => callback(err, result));
  }

  getOne(table, userInfo, callback) {

    const newQuery = queryForSelect(userInfo);
    const newValues = valuesArray(userInfo);

    db.query(`select * from ${table} where ${newQuery};`, newValues, (err, result) => callback(err, result));
  }

  getOneAndUpdate(table, filter, update) {

    const setQuery = queryForUpdate(update);
    const whereQuery = queryForUpdate(filter);
    const setValues = valuesArray(update);
    const whereValues = valuesArray(filter);
    const completeValues = setValues.concat(whereValues);

    db.query(`update ${table} set ${setQuery} where ${whereQuery};`, completeValues, (err, result) => {
      return callback(err, result);
    });
  }

  newItem(table, item, callback) {
    const newQuery = queryForCreate(item);
    const values = valuesArray(item);

    db.query(`insert into ${table}(${newQuery}) values (?)`, [values], (err, result) => {
      return callback(err, result)
    });
  }

  deleteItem(table, id, callback) {

    db.query(`delete from ${table} where id = ?;`, [id], (err, result) => {
      return callback(err, result);
    });
  }
}

module.exports = Middlewares;

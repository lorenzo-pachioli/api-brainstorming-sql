const { queryForSelect, valuesArray, queryForUpdate, queryForCreate } = require('../../utils/middlewareHandlres');
const { query } = require('../../config/dbConnection');

class Middlewares {

  async getAllTable(table, callback = (err, result) => { }) {
    try {
      const data = await query(`select * from ${table};`);
      callback(null, data);
      return data;
    } catch (error) {
      return callback(error, null);
    }
  }

  async getAllMatchs(table, userInfo, callback = (err, result) => { }) {
    try {
      const newQuery = queryForSelect(userInfo);
      const newValues = valuesArray(userInfo);
      const data = await query(`select * from ${table} where ${newQuery};`, newValues);
      callback(null, data);
      return data;
    } catch (error) {
      return callback(error, null);
    }
  }

  async getInSet(table, filter, values, callback = (err, result) => { }) {
    try {
      const setValues = values.toString();
      const data = await query(`select * from ${table} t where FIND_IN_SET(t.${filter}, '${setValues}');`);
      callback(null, data);
      return data;
    } catch (error) {
      return callback(error, null);
    }
  }

  async getOneAndUpdate(table, filter, update, callback = (err, result) => { }) {
    try {
      const setQuery = queryForUpdate(update);
      const whereQuery = queryForUpdate(filter);
      const setValues = valuesArray(update);
      const whereValues = valuesArray(filter);
      const completeValues = setValues.concat(whereValues);
      const data = await query(`update ${table} set ${setQuery} where ${whereQuery};`, completeValues);
      callback(null, data);
      return data;
    } catch (err) {
      return callback(err, null);
    }
  }

  async updateMany(table, ids, update, callback = (err, result) => { }) {
    try {
      const setQuery = queryForUpdate(update);
      const setValues = valuesArray(update);
      const completeValues = setValues.concat(ids);
      const data = await query(`update ${table} t set ${setQuery} where id in(${ids.toString()});`, completeValues);
      callback(null, data);
      return data;
    } catch (err) {
      return callback(err, null);
    }
  }

  async newItem(table, item, callback = (err, result) => { }) {
    try {
      const newQuery = queryForCreate(item);
      const values = valuesArray(item);
      const data = await query(`insert into ${table}(${newQuery}) values (?)`, [values]);
      callback(null, data);
      return data;
    } catch (error) {
      return callback(error, null);
    }
  }

  async deleteItem(table, id, callback = (err, result) => { }) {
    try {
      const data = await query(`delete from ${table} where id = ?;`, [id]);
      callback(null, data);
      return data;
    } catch (error) {
      return callback(error, null);
    }
  }

  async deleteMany(table, ids, callback = (err, result) => { }) {
    try {
      const data = await query(`delete from ${table} where id in(${ids.toString()});`, ids);
      callback(null, data);
      return data;
    } catch (err) {
      return callback(err, null);
    }
  }
}

module.exports = Middlewares;

const { queryForSelect, valuesArray, queryForUpdate, queryForCreate } = require('../../utils/middlewareHandlres');
const { query } = require('../../config/dbConnection');

class Middlewares {

  async getAllTable(table) {

    const data = await query(`select * from ${table};`);
    return data;
  }

  async getAllMatchs(table, userInfo) {

    const newQuery = queryForSelect(userInfo);
    const newValues = valuesArray(userInfo);
    const data = await query(`select * from ${table} where ${newQuery};`, newValues);
    return data;
  }

  async getInSet(table, filter, values) {

    const setValues = values.toString();
    const data = await query(`select * from ${table} t where FIND_IN_SET(t.${filter}, '${setValues}');`);
    return data;
  }

  async getOneAndUpdate(table, filter, update) {

    const setQuery = queryForUpdate(update);
    const whereQuery = queryForUpdate(filter);
    const setValues = valuesArray(update);
    const whereValues = valuesArray(filter);
    const completeValues = setValues.concat(whereValues);
    const data = await query(`update ${table} set ${setQuery} where ${whereQuery};`, completeValues);
    return data;
  }

  async updateMany(table, ids, update) {

    const setQuery = queryForUpdate(update);
    const setValues = valuesArray(update);
    const completeValues = setValues.concat(ids);
    const data = await query(`update ${table} t set ${setQuery} where id in(${ids.toString()});`, completeValues);
    return data;
  }

  async newItem(table, item) {

    const newQuery = queryForCreate(item);
    const values = valuesArray(item);
    const data = await query(`insert into ${table}(${newQuery}) values (?)`, [values]);
    return data;
  }

  async deleteItem(table, id) {

    const data = await query(`delete from ${table} where id = ?;`, [id]);
    return data;
  }

  async deleteMany(table, ids) {

    const data = await query(`delete from ${table} where id in(${ids.toString()});`, ids);
    return data;
  }
}

module.exports = Middlewares;

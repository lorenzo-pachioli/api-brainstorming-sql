require('dotenv').config();
const sql = require('mysql');
const util = require('util');

exports.db = sql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'api_brainstorming'
});

exports.query = util.promisify(this.db.query).bind(this.db);

console.log('db status', this.db.state);
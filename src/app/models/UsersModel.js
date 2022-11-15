const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  id: {
    type: Number,
    required: true,
    min: 1,
    unique: true,
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: false
    },
    last: {
      type: String,
      required: false
    }
  }
});
const UsersBrainstorming = model('UsersBrainstorming', usersSchema);
module.exports = UsersBrainstorming;

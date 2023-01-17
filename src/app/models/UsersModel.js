const Model = require("../middlewares/QueryFunctions");

const usersSchema = {
  email: {
    type: String,
    required: true,
    length: {
      min: 6,
      max: 45
    },
  },
  username: {
    type: String,
    required: true,
    length: {
      min: 5,
      max: 45
    },
  },
  password: {
    type: String,
    required: true,
    length: {
      min: 5,
      max: 20
    },
  },
  firstname: {
    type: String,
    required: false,
    length: {
      min: 3,
      max: 25
    }
  },
  lastname: {
    type: String,
    required: false,
    default: 'lastname',
    length: {
      min: 1,
      max: 25
    },
  }
};

const User = new Model('user', usersSchema);

module.exports = User;

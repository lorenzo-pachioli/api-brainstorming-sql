const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { NewUsersService, AllUsersService, UsersServiceById } = require('../services/UsersService');
const { isNewUserValid } = require('../../utils/newItemsValidator');

exports.NewUsersController = (token, newUser, res) => {

  if (isTokenValid(token, res) && isNewUserValid(newUser, res)) {
    NewUsersService(newUser, res);
  }
}

exports.AllUsersController = (token, res) => {

  isTokenValid(token, res) && AllUsersService(res);
}

exports.UsersControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && UsersServiceById(id, res);
}
